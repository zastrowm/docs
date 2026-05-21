#!/usr/bin/env bash
set -euo pipefail

# One-shot script to restructure the docs repo for monorepo convergence.
# Assumes a clean checkout of main with no uncommitted changes.
# Run from the repo root.

if [[ ! -f package.json ]] || [[ ! -d .github/workflows ]]; then
  echo "ERROR: Must be run from the docs repo root (expected package.json and .github/workflows)" >&2
  exit 1
fi

if [[ -d site/src ]]; then
  echo "ERROR: site/src already exists — repo appears to be already converted" >&2
  exit 1
fi

if [[ -n "$(git status --porcelain -- ':!prepare-monorepo.sh')" ]]; then
  echo "ERROR: Working tree is not clean. Commit or stash changes first." >&2
  exit 1
fi

echo "==> Moving files into site/"
mkdir -p site

# Move all top-level files except README.md
git mv .gitignore .node-version .prettierignore AGENTS.md ARCHITECTURE.md \
  CMS-TODO.md CODE_OF_CONDUCT.md CONTRIBUTING.md LICENSE NOTICE \
  SITE-ARCHITECTURE.md astro.config.mjs mkdocs.yml package.json \
  tsconfig.json typedoc-tsconfig.json typedoc.json vitest.config.ts site/

# Move all top-level directories except designs/ and .github/
git mv docs overrides public scripts src team test test-snippets site/

echo "==> Updating site/.gitignore"
# Remove the 'site/' entry (no longer relevant inside site/)
sed -i.bak '/^site\/$/d' site/.gitignore && rm -f site/.gitignore.bak

echo "==> Renaming workflows with docs- prefix"
git mv .github/workflows/ci.yml .github/workflows/docs-ci.yml
git mv .github/workflows/deploy-github-pages.yml .github/workflows/docs-deploy-github-pages.yml
git mv .github/workflows/docs-preview.yml .github/workflows/docs-deploy-preview.yml
git mv .github/workflows/auto-strands-review.yml .github/workflows/docs-auto-strands-review.yml
git mv .github/workflows/strands-command.yml .github/workflows/docs-strands-command.yml

echo "==> Rewriting docs-ci.yml"
cat > .github/workflows/docs-ci.yml << 'WORKFLOW'
name: "Docs: CI"

on:
  workflow_dispatch:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]
    paths:
      - 'site/**'
      - '.github/workflows/docs-*'

permissions:
  contents: read

defaults:
  run:
    working-directory: site

jobs:
  ci:
    name: CI
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run cms:build

      - name: Typecheck
        run: npm run typecheck

      - name: Build TypeScript SDK
        run: npm install --ignore-scripts && npm run build && rm -rf node_modules
        working-directory: site/.build/sdk-typescript

      - name: Re-link SDK types
        run: npm install

      - name: Typecheck snippets
        run: npm run typecheck:snippets

      - name: Test
        run: npm test
WORKFLOW

echo "==> Rewriting docs-deploy-github-pages.yml"
cat > .github/workflows/docs-deploy-github-pages.yml << 'WORKFLOW'
name: "Docs: Deploy to GitHub Pages"

on:
  workflow_dispatch:

permissions:
  contents: write

defaults:
  run:
    working-directory: site

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Install dependencies
        run: npm install

      - name: Build CMS
        run: npm run cms:build
        env:
          SITE_DOMAIN: https://strandsagents.com

      - name: Create latest/ symlinks for llms.txt files
        run: |
          mkdir -p dist/latest
          ln dist/llms.txt dist/latest/llms.txt
          ln dist/llms-full.txt dist/latest/llms-full.txt

      - name: Deploy to gh-pages branch
        working-directory: .
        run: |
          git config user.name github-actions[bot]
          git config user.email 41898282+github-actions[bot]@users.noreply.github.com
          git fetch origin gh-pages || true
          git worktree add gh-pages-deploy origin/gh-pages 2>/dev/null || git worktree add --orphan -b gh-pages gh-pages-deploy
          rsync -a --delete --exclude='.git' --exclude='CNAME' site/dist/ gh-pages-deploy/
          cd gh-pages-deploy
          git add -A
          git diff --cached --quiet || git commit -m "Deploy to GitHub Pages from ${{ github.sha }}"
          git push origin HEAD:gh-pages
WORKFLOW

echo "==> Rewriting docs-deploy-preview.yml"
cat > .github/workflows/docs-deploy-preview.yml << 'WORKFLOW'
name: "Docs: Deploy Preview"

on:
  pull_request_target:
    types: [opened, reopened, synchronize]
    paths:
      - 'site/**'
      - '.github/workflows/docs-*'

concurrency:
  group: preview-cms-${{ github.event.pull_request.number }}
  cancel-in-progress: true

jobs:
  authorization-check:
    name: Authorization Check
    permissions: read-all
    runs-on: ubuntu-latest
    outputs:
      approval-env: ${{ steps.auth.outputs.approval-env }}
    steps:
      - name: Check Authorization
        id: auth
        uses: strands-agents/devtools/authorization-check@main
        with:
          username: ${{ github.event.pull_request.user.login }}
          allowed-roles: 'write,maintain,admin'

  build-and-deploy:
    name: Build and Deploy Preview
    runs-on: ubuntu-latest
    needs: authorization-check
    environment: ${{ needs.authorization-check.outputs.approval-env }}

    permissions:
      contents: read
      issues: write
      pull-requests: write
      id-token: write # For OIDC authentication

    env:
      # PR metadata
      PR_NUMBER: ${{ github.event.pull_request.number }}
      PR_HEAD_SHA: ${{ github.event.pull_request.head.sha }}
      RUN_ID: ${{ github.run_id }}
      # Secrets
      AWS_DEPLOY_ROLE: ${{ secrets.STRANDS_DOCS_DEPLOY_ROLE }}
      S3_BUCKET: ${{ secrets.STRANDS_DOCS_BUCKET }}
      CLOUDFRONT_DISTRIBUTION_ID: ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }}
      CLOUDFRONT_DOMAIN: ${{ secrets.CLOUDFRONT_DOMAIN }}
      # Derived paths (defined once, used everywhere)
      BUILD_OUTPUT_DIR: site/dist
      S3_PATH: pr-cms-${{ github.event.pull_request.number }}
      PREVIEW_URL: https://${{ secrets.CLOUDFRONT_DOMAIN }}/pr-cms-${{ github.event.pull_request.number }}/docs/user-guide/quickstart/overview/
      RUN_URL: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}

    defaults:
      run:
        working-directory: site

    steps:
      - name: Checkout head commit
        uses: actions/checkout@v4
        with:
          ref: ${{ env.PR_HEAD_SHA }}
          persist-credentials: false

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Install dependencies
        run: npm install

      - name: Build CMS
        env:
          ASTRO_BASE_PATH: /${{ env.S3_PATH }}/
        run: npm run cms:build

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ env.AWS_DEPLOY_ROLE }}
          role-session-name: GitHubActions-Docs-${{ env.RUN_ID }}
          aws-region: us-east-1
          mask-aws-account-id: true

      - name: Deploy to S3
        working-directory: .
        run: |
          aws s3 sync ${{ env.BUILD_OUTPUT_DIR }}/ s3://${{ env.S3_BUCKET }}/${{ env.S3_PATH }}/ \
            --cache-control "public, max-age=3600"

      - name: Invalidate CloudFront cache for PR preview
        working-directory: .
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ env.CLOUDFRONT_DISTRIBUTION_ID }} \
            --invalidation-batch '{"Paths":{"Quantity":1,"Items":["/${{ env.S3_PATH }}/*"]},"CallerReference":"'$(date +%s)'"}'

      - name: Output deployment info
        run: |
          echo "Deployment complete!"
          echo "Deployed to: ${{ env.PREVIEW_URL }}"
          echo "This is a preview deployment for PR #${{ env.PR_NUMBER }}"

      - name: Comment on PR (success)
        if: success()
        uses: actions/github-script@v7
        with:
          script: |
            const prNumber = context.payload.pull_request.number;
            const previewUrl = '${{ env.PREVIEW_URL }}';

            // Find existing bot comment
            const comments = await github.rest.issues.listComments({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: prNumber,
            });

            const botComment = comments.data.find(comment =>
              comment.user.type === 'Bot' &&
              comment.body.includes('Documentation Preview')
            );

            const body = [
              '## Documentation Preview Ready',
              '',
              'Your documentation preview has been successfully deployed!',
              '',
              `**Preview URL**: ${previewUrl}`,
              '',
              `_Updated at: ${new Date().toISOString()}_`
            ].join('\n');

            if (botComment) {
              await github.rest.issues.updateComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                comment_id: botComment.id,
                body: body
              });
            } else {
              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: prNumber,
                body: body
              });
            }

      - name: Comment on PR (failure)
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            const prNumber = context.payload.pull_request.number;
            const runUrl = '${{ env.RUN_URL }}';

            const body = [
              '## Documentation Preview Failed',
              '',
              `The documentation deployment encountered an error. Please check the [deployment logs](${runUrl}) for more details.`
            ].join('\n');

            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: prNumber,
              body: body
            });
WORKFLOW

echo "==> Rewriting docs-auto-strands-review.yml"
cat > .github/workflows/docs-auto-strands-review.yml << 'WORKFLOW'
name: "Docs: Auto Strands Review"

on:
  pull_request_target:
    branches: [main]
    types: [opened, synchronize, reopened, ready_for_review]
    paths:
      - 'site/**'
      - '.github/workflows/docs-*'

jobs:
  authorization-check:
    name: Check access
    permissions: read-all
    runs-on: ubuntu-latest
    outputs:
      approval-env: ${{ steps.auth.outputs.approval-env }}
    steps:
      - name: Check Authorization
        id: auth
        uses: strands-agents/devtools/authorization-check@main
        with:
          skip-check: false
          username: ${{ github.event.pull_request.user.login || 'invalid' }}
          allowed-roles: 'triage,write,admin'

  trigger-review:
    name: Trigger Strands Review
    needs: authorization-check
    environment: ${{ needs.authorization-check.outputs.approval-env }}
    permissions:
      actions: write
      contents: read
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Strands Command Workflow
        uses: actions/github-script@v8
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            await github.rest.actions.createWorkflowDispatch({
              owner: context.repo.owner,
              repo: context.repo.repo,
              workflow_id: 'docs-strands-command.yml',
              ref: 'main',
              inputs: {
                issue_id: String(context.payload.pull_request.number),
                command: 'review',
                session_id: ''
              }
            });
            console.log(`Triggered /strands review for PR #${context.payload.pull_request.number}`);
WORKFLOW

echo "==> Rewriting docs-strands-command.yml"
cat > .github/workflows/docs-strands-command.yml << 'WORKFLOW'
name: "Docs: Strands Command Handler"

on:
  issue_comment:
    types: [created]
  workflow_dispatch:
    inputs:
      issue_id:
        description: 'Issue ID to process (can be issue or PR number)'
        required: true
        type: string
      command:
        description: 'Strands command to execute'
        required: false
        type: string
        default: ''
      session_id:
        description: 'Optional session ID to use'
        required: false
        type: string
        default: ''

jobs:
  authorization-check:
    if: startsWith(github.event.comment.body, '/strands') || github.event_name == 'workflow_dispatch'
    name: Check access
    permissions: read-all
    runs-on: ubuntu-latest
    outputs:
      approval-env: ${{ steps.auth.outputs.approval-env }}
    steps:
      - name: Check Authorization
        id: auth
        uses: strands-agents/devtools/authorization-check@main
        with:
          skip-check: ${{ github.event_name == 'workflow_dispatch' }}
          username: ${{ github.event.comment.user.login || 'invalid' }}
          allowed-roles: 'triage,write,admin'

  setup-and-process:
    needs: [authorization-check]
    environment: ${{ needs.authorization-check.outputs.approval-env }}
    permissions:
      contents: write
      issues: write
      pull-requests: write
    runs-on: ubuntu-latest
    steps:
      - name: Parse input
        id: parse
        uses: strands-agents/devtools/strands-command/actions/strands-input-parser@main
        with:
          issue_id: ${{ inputs.issue_id }}
          command: ${{ inputs.command }}
          session_id: ${{ inputs.session_id }}

  execute-readonly-agent:
    needs: [setup-and-process]
    permissions:
      contents: read
      issues: read
      pull-requests: read
      id-token: write # Required for OIDC
    runs-on: ubuntu-latest
    timeout-minutes: 60
    steps:
      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: '20'

      - name: Run Strands Agent
        id: agent-runner
        uses: strands-agents/devtools/strands-command/actions/strands-agent-runner@main
        with:
          aws_role_arn: ${{ secrets.AWS_ROLE_ARN }}
          sessions_bucket: ${{ secrets.AGENT_SESSIONS_BUCKET }}
          write_permission: 'false'
          langfuse_public_key: ${{ secrets.LANGFUSE_PUBLIC_KEY }}
          langfuse_secret_key: ${{ secrets.LANGFUSE_SECRET_KEY }}
          langfuse_host: ${{ secrets.LANGFUSE_HOST }}
          evals_sqs_queue_arn: ${{ secrets.EVALS_SQS_QUEUE_ARN }}

  finalize:
    if: always() && (startsWith(github.event.comment.body, '/strands') || github.event_name == 'workflow_dispatch')
    needs: [setup-and-process, execute-readonly-agent]
    permissions:
      contents: write
      issues: write
      pull-requests: write
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - name: Execute write operations
        uses: strands-agents/devtools/strands-command/actions/strands-finalize@main
WORKFLOW

echo "==> Updating dependabot npm directory"
# Change npm ecosystem directory from "/" to "/site" (line containing the first directory: entry)
awk '/package-ecosystem: "npm"/{found=1} found && /directory:/{sub(/directory: "\/"/,"directory: \"/site\""); found=0} 1' \
  .github/dependabot.yml > .github/dependabot.yml.tmp && mv .github/dependabot.yml.tmp .github/dependabot.yml

echo "==> Staging all changes"
git add -A

echo ""
echo "Done! Review with 'git status' and 'git diff --cached --stat', then commit with:"
echo ""
echo '  git commit -m "refactor: move all files into site/ subdirectory"'
echo ""
echo "Validate by pushing to a fork and triggering docs-ci.yml via workflow_dispatch."
