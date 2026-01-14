# Get Featured in the Docs

Want to share your Strands integration with the community? Here's how to get it featured in our docs.

## Quick Steps

1. **Create a PR** to [strands-agents/docs](https://github.com/strands-agents/docs)
2. **Add your doc file** in the appropriate `community/` subdirectory
3. **Update `mkdocs.yml`** to include your new page in the nav

## Directory Structure

Place your documentation in the right spot:

| Type | Directory | Example |
|------|-----------|---------|
| Model Providers | `community/model-providers/` | `cohere.md` |
| Tools | `community/tools/` | `strands-deepgram.md` |
| Session Managers | `community/session-managers/` | `agentcore-memory.md` |
| Integrations | `community/integrations/` | `ag-ui.md` |

## Document Layout

Your Strands docs page should be a **concise overview** — not a copy of your GitHub README. Keep it focused on getting users started quickly. Save the deep dives, advanced configurations, and detailed API docs for your project's own documentation.

Follow this structure (see existing docs for reference):

```markdown
# Package Name

{{ community_contribution_banner }}

Brief intro explaining what your package does and why it's useful.

## Installation

pip install your-package

## Usage

Working code example showing basic usage with Strands Agent.

## Configuration

Environment variables, client options, or model parameters.

## Troubleshooting (optional)

Common issues and how to fix them.

## References

Links to your repo, PyPI, official docs, etc.
```

### For Tools

Add frontmatter with project metadata:

```yaml
---
project:
  pypi: https://pypi.org/project/your-package/
  github: https://github.com/your-org/your-repo
  maintainer: your-github-username
service:
  name: service-name
  link: https://service-website.com/
---
```

## Update mkdocs.yml

Add your page to the `nav` section under Community:

```yaml
nav:
  - Community:
      - Model Providers:
        - Your Provider: community/model-providers/your-provider.md
      - Tools:
        - your-tool: community/tools/your-tool.md
```

## Examples to Follow

- **Model Provider**: [fireworksai.md](https://github.com/strands-agents/docs/blob/main/docs/community/model-providers/fireworksai.md)
- **Tool**: [strands-deepgram.md](https://github.com/strands-agents/docs/blob/main/docs/community/tools/strands-deepgram.md)

## Questions?

Open an issue at [strands-agents/docs](https://github.com/strands-agents/docs/issues) — we're happy to help!
