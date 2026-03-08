# Agent Development Guide - strands-agents/private-docs-staging

This document provides guidance specifically for AI agents working on the strands-agents/private-docs-staging codebase. For human contributor guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Purpose and Scope
The goal of this repository is to revamp this documentation repo so that it provides clear and well organized documentation on how to develop with Strands SDK with either Python or Typescript.

**AGENTS.md** contains agent-specific repository information including:
- Directory structure with summaries of what is included in each directory
- Development workflow instructions for agents to follow when developing features
- Coding patterns and testing patterns to follow when writing code
- Style guidelines, organizational patterns, and best practices

**For human contributors**: See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, testing, and contribution guidelines.

## Team Process Documents

When working on SDK features or documentation, familiarize yourself with these team processes:

* **[Feature Lifecycle Process](team/FEATURE_LIFECYCLE.md)**: How features are added, versioned, deprecated, and graduated from experimental status
* **[API Bar Raising](team/API_BAR_RAISING.md)**: Standards for API design quality
* **[Decisions](team/DECISIONS.md)**: Key architectural and design decisions
* **[Tenets](team/TENETS.md)**: Core principles guiding SDK development

These documents define the standards and processes that ensure consistency and quality across the Strands SDK.

## Directory Structure

```
├── AGENTS.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── docs
│   ├── api-reference
│   │   ├── agent.md
│   │   ├── event-loop.md
│   │   ├── experimental.md
│   │   ├── handlers.md
│   │   ├── hooks.md
│   │   ├── interrupt.md
│   │   ├── models.md
│   │   ├── multiagent.md
│   │   ├── session.md
│   │   ├── telemetry.md
│   │   ├── tools.md
│   │   └── types.md
│   ├── assets
│   │   ├── auto-redirect.js
│   │   ├── logo-auto.svg
│   │   ├── logo-dark.svg
│   │   ├── logo-light.png
│   │   ├── logo-light.svg
│   │   ├── multimodal
│   │   │   ├── whale_1.png
│   │   │   ├── whale_2_large.png
│   │   │   ├── whale_2.png
│   │   │   └── whale_3.png
│   │   └── trace_visualization.png
│   ├── community
│   │   ├── community-packages.md
│   │   ├── model-providers
│   │   │   ├── clova-studio.md
│   │   │   ├── cohere.md
│   │   │   └── fireworksai.md
│   │   ├── session-managers
│   │   │   └── agentcore-memory.md
│   │   └── tools
│   │       └── utcp.md
│   ├── examples
│   │   ├── cdk
│   │   │   ├── deploy_to_ec2
│   │   │   │   ├── app
│   │   │   │   │   └── app.py
│   │   │   │   ├── bin
│   │   │   │   │   └── cdk-app.ts
│   │   │   │   ├── cdk.json
│   │   │   │   ├── lib
│   │   │   │   │   └── agent-ec2-stack.ts
│   │   │   │   ├── package-lock.json
│   │   │   │   ├── package.json
│   │   │   │   ├── README.md
│   │   │   │   ├── requirements.txt
│   │   │   │   └── tsconfig.json
│   │   │   ├── deploy_to_fargate
│   │   │   │   ├── bin
│   │   │   │   │   └── cdk-app.ts
│   │   │   │   ├── cdk.json
│   │   │   │   ├── docker
│   │   │   │   │   ├── app
│   │   │   │   │   │   └── app.py
│   │   │   │   │   ├── Dockerfile
│   │   │   │   │   └── requirements.txt
│   │   │   │   ├── lib
│   │   │   │   │   └── agent-fargate-stack.ts
│   │   │   │   ├── package-lock.json
│   │   │   │   ├── package.json
│   │   │   │   ├── README.md
│   │   │   │   └── tsconfig.json
│   │   │   └── deploy_to_lambda
│   │   │       ├── bin
│   │   │       │   ├── cdk-app.ts
│   │   │       │   └── package_for_lambda.py
│   │   │       ├── cdk.json
│   │   │       ├── lambda
│   │   │       │   └── agent_handler.py
│   │   │       ├── lib
│   │   │       │   └── agent-lambda-stack.ts
│   │   │       ├── package-lock.json
│   │   │       ├── package.json
│   │   │       ├── README.md
│   │   │       ├── requirements.txt
│   │   │       └── tsconfig.json
│   │   ├── deploy_to_eks
│   │   │   ├── chart
│   │   │   │   ├── Chart.yaml
│   │   │   │   ├── templates
│   │   │   │   │   ├── _helpers.tpl
│   │   │   │   │   ├── deployment.yaml
│   │   │   │   │   ├── ingress.yaml
│   │   │   │   │   ├── NOTES.txt
│   │   │   │   │   ├── poddisruptionbudget.yaml
│   │   │   │   │   ├── service.yaml
│   │   │   │   │   └── serviceaccount.yaml
│   │   │   │   └── values.yaml
│   │   │   ├── docker
│   │   │   │   ├── app
│   │   │   │   │   └── app.py
│   │   │   │   ├── Dockerfile
│   │   │   │   └── requirements.txt
│   │   │   └── README.md
│   │   ├── python
│   │   │   ├── agents_workflow.py
│   │   │   ├── agents_workflows.md
│   │   │   ├── cli-reference-agent.md
│   │   │   ├── file_operations.md
│   │   │   ├── file_operations.py
│   │   │   ├── graph_loops_example.md
│   │   │   ├── graph_loops_example.py
│   │   │   ├── knowledge_base_agent.md
│   │   │   ├── knowledge_base_agent.py
│   │   │   ├── mcp_calculator.md
│   │   │   ├── mcp_calculator.py
│   │   │   ├── memory_agent.md
│   │   │   ├── memory_agent.py
│   │   │   ├── meta_tooling.md
│   │   │   ├── meta_tooling.py
│   │   │   ├── multi_agent_example
│   │   │   │   ├── computer_science_assistant.py
│   │   │   │   ├── english_assistant.py
│   │   │   │   ├── index.md
│   │   │   │   ├── language_assistant.py
│   │   │   │   ├── math_assistant.py
│   │   │   │   ├── multi_agent_example.md
│   │   │   │   ├── no_expertise.py
│   │   │   │   └── teachers_assistant.py
│   │   │   ├── multimodal.md
│   │   │   ├── multimodal.py
│   │   │   ├── structured_output.md
│   │   │   ├── structured_output.py
│   │   │   ├── weather_forecaster.md
│   │   │   └── weather_forecaster.py
│   │   └── README.md
│   ├── README.md
│   ├── stylesheets
│   │   └── extra.css
│   └── user-guide
│       ├── concepts
│       │   ├── agents
│       │   │   ├── agent-loop.md
│       │   │   ├── agent-loop.ts
│       │   │   ├── conversation-management.md
│       │   │   ├── hooks.md
│       │   │   ├── prompts.md
│       │   │   ├── session-management.md
│       │   │   ├── state.md
│       │   │   └── structured-output.md
│       │   ├── experimental
│       │   │   ├── agent-config.md
│       │   │   └── multi-agent-hooks.md
│       │   ├── interrupts.md
│       │   ├── model-providers
│       │   │   ├── amazon-bedrock.md
│       │   │   ├── anthropic.md
│       │   │   ├── clova-studio.md
│       │   │   ├── cohere.md
│       │   │   ├── custom_model_provider.md
│       │   │   ├── fireworksai.md
│       │   │   ├── gemini.md
│       │   │   ├── litellm.md
│       │   │   ├── llamaapi.md
│       │   │   ├── llamacpp.md
│       │   │   ├── mistral.md
│       │   │   ├── ollama.md
│       │   │   ├── openai.md
│       │   │   ├── sagemaker.md
│       │   │   └── writer.md
│       │   ├── multi-agent
│       │   │   ├── agent-to-agent.md
│       │   │   ├── agents-as-tools.md
│       │   │   ├── graph.md
│       │   │   ├── multi-agent-patterns.md
│       │   │   ├── swarm.md
│       │   │   └── workflow.md
│       │   ├── streaming
│       │   │   ├── async-iterators.md
│       │   │   ├── callback-handlers.md
│       │   │   └── index.md
│       │   └── tools
│       │       ├── community-tools-package.md
│       │       ├── executors.md
│       │       ├── mcp-tools.md
│       │       ├── python-tools.md
│       │       └── index.md
│       ├── deploy
│       │   ├── deploy_to_amazon_ec2.md
│       │   ├── deploy_to_amazon_eks.md
│       │   ├── deploy_to_aws_fargate.md
│       │   ├── deploy_to_aws_lambda.md
│       │   ├── deploy_to_bedrock_agentcore.md
│       │   └── operating-agents-in-production.md
│       ├── observability-evaluation
│       │   ├── evaluation.md
│       │   ├── logs.md
│       │   ├── metrics.md
│       │   ├── observability.md
│       │   └── traces.md
│       ├── quickstart.md
│       └── safety-security
│           ├── guardrails.md
│           ├── pii-redaction.md
│           ├── prompt-engineering.md
│           └── responsible-ai.md
├── LICENSE
├── NOTICE
├── overrides
│   ├── main.html
│   └── partials
│       └── logo.html
├── package-lock.json
├── package.json
├── pyproject.toml
├── README.md
└── tsconfig.json
```
### Directory Purposes


**IMPORTANT**: After making changes that affect the directory structure (adding new directories, moving files, or adding significant new files), you MUST update this directory structure section to reflect the current state of the repository.

## Development Workflow for Agents

### 1. Environment Setup
#### Prerequisites

- Python 3.10+
- Node.js 20+, npm

#### Setup and Installation

```bash
# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows use: .venv\Scripts\activate

pip install .
```

#### Building and Previewing

To generate the static site:

```bash
npm run build
```

This will create the site in the `dist` directory.

To run a local development server:

```bash
npm run dev
```

This will start a server at http://localhost:4321/ for previewing the documentation.

### 2. Making Changes

1. **Create feature branch**: `git checkout -b agent-tasks/{ISSUE_NUMBER}`
2. **Implement changes** following the patterns below
3. **Run quality checks** before committing (pre-commit hooks will run automatically)
4. **Commit with conventional commits**: `feat:`, `fix:`, `refactor:`, `docs:`, etc.
5. **Push to remote**: `git push origin agent-tasks/{ISSUE_NUMBER}`

### 3. Quality Gates

Pre-commit hooks automatically run:
- Unit tests (via npm test)
- Linting (via npm run lint)
- Format checking (via npm run format:check)
- Type checking (via npm run type-check)

All checks must pass before commit is allowed.

## Coding Patterns and Best Practices

### Code Style Guidelines (for Typescript)

**Formatting** (enforced by Prettier):
- No semicolons
- Single quotes
- Line length: 120 characters
- Tab width: 2 spaces
- Trailing commas in ES5 style

**Example**:
```typescript
export function example(name: string, options?: Options): Result {
  const config = {
    name,
    enabled: true,
    settings: {
      timeout: 5000,
      retries: 3,
    },
  }

  return processConfig(config)
}
```

### Import Organization

Organize imports in this order:
```typescript
// 1. External dependencies
import { something } from 'external-package'

// 2. Internal modules (using relative paths)
import { Agent } from '../agent'
import { Tool } from '../tools'

// 3. Types (if separate)
import type { Options, Config } from '../types'
```


## Agent-Specific Notes

### When Implementing Features

1. **Read task requirements** carefully from the GitHub issue
2. **Use existing patterns** as reference
3. **Run all checks** before committing (pre-commit hooks will enforce this)


### Integration with Other Files

- **CONTRIBUTING.md**: Contains testing/setup commands and human contribution guidelines
- **README.md**: Public-facing documentation, links to strandsagents.com
- **package.json**: Defines the scripts needed to validate the TS syntax typing are correct
- **src/config/navigation.yml**: Defines the sidebar, navbar, and GitHub sections for the Strands Agents SDK documentation served at https://strandsagents.com

## Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TSDoc Reference](https://tsdoc.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Strands Agents Documentation](https://strandsagents.com/)
- [Typescript SDK](https://github.com/strands-agents/sdk-typescript/)

# TypeScript Code Examples Guide

This guide explains how to add TypeScript code examples alongside Python examples in the Strands Agents documentation using MkDocs snippets feature.

## Overview

The documentation supports showing both Python and TypeScript code examples side-by-side using:
- **MkDocs tabbed content** for language switching
- **PyMdown snippets extension** for external code file inclusion
- **TypeScript type checking** for code validation

### 1. Create TypeScript Code File

Create a `.ts` file alongside your `.md` file with snippet markers:

```typescript
// docs/user-guide/concepts/agents/agent-loop.ts
import { Agent } from '@strands-agents/sdk'
import { notebook } from '@strands-agents/sdk/vended_tools/notebook'

// --8<-- [start:initialization]
// Initialize the agent with tools, model, and configuration
const agent = new Agent({
  tools: [notebook],
  systemPrompt: 'You are a helpful assistant.',
})
// --8<-- [end:initialization]

// --8<-- [start:processResult]
// Process user input
const result = await agent.invoke('Calculate 25 * 48')
// --8<-- [end:processResult]
```

### 2. Use Tabbed Content in Markdown

In your `.md` file, use tabbed content with snippet inclusion:

```markdown
=== "Python"

    ```python
    from strands import Agent
    from strands_tools import calculator
    
    # Initialize the agent with tools, model, and configuration
    agent = Agent(
        tools=[calculator],
        system_prompt="You are a helpful assistant."
    )
    ```

=== "TypeScript"

    ```typescript
    --8<-- "user-guide/concepts/agents/agent-loop.ts:initialization"
    ```
```

## Snippet Syntax

### Basic Snippet Inclusion

```markdown
--8<-- "path/to/file.ts:snippet_name"
```

### Snippet Markers in Code

Use HTML-style comments to mark snippet boundaries:

```typescript
// --8<-- [start:snippet_name]
// Your code here
// --8<-- [end:snippet_name]
```

**Note**: Leading spaces are automatically removed from included snippets, so indentation within the source file doesn't affect the final output. However, if the snippet file name is indented in the markdown, the content will be indented to that level as well. See [the documentation](https://facelessuser.github.io/pymdown-extensions/extensions/snippets/#dedent-subsections) for more information.

### Multiple Snippets in One File

```typescript
// --8<-- [start:initialization]
const agent = new Agent({ /* ... */ })
// --8<-- [end:initialization]

// --8<-- [start:usage]
const result = await agent.invoke('Hello')
// --8<-- [end:usage]
```

## Type Checking Integration

### Package.json Scripts

```json
{
  "scripts": {
    "test": "tsc --noEmit",
    "format": "prettier --write docs",
    "format:check": "prettier --check docs"
  }
}
```

## Best Practices

### 1. File Organization

```
docs/
├── user-guide/
│   └── concepts/
│       └── agents/
│           ├── agent-loop.md      # Documentation
│           └── agent-loop.ts      # TypeScript examples
```

### 2. Snippet Naming

Use descriptive snippet names that match the context:

```typescript
// --8<-- [start:basic_agent_creation]
// --8<-- [start:agent_with_tools]
// --8<-- [start:streaming_example]
```

### 3. Variable Scoping for Snippets

When multiple snippets in the same file use the same variable names, wrap snippets in functions to avoid TypeScript scoping conflicts. Place snippet markers **inside** the function so only the code is displayed in documentation:

```typescript
// ❌ Wrong: Snippet includes function definition
// --8<-- [start:example]
async function example() {
  const result = await agent.invoke('Hello')
  console.log(result)
}
// --8<-- [end:example]

// ✅ Correct: Function is for scoping only, snippet is just the code
async function example() {
  // --8<-- [start:example]
  const result = await agent.invoke('Hello')
  console.log(result)
  // --8<-- [end:example]
}
```

**Why:** 
- TypeScript treats the entire file as a single scope with `isolatedModules: true`
- Multiple snippets with the same variable names cause redeclaration errors
- Functions provide scoping without cluttering the documentation with function definitions

### 4. Code Validation

- All TypeScript code should compile without errors
- Use `npm run test` to validate TypeScript
- Use `npm run format` to maintain consistent formatting

### 5. Fallback for Unsupported Features

For features not available in TypeScript, use one of the predefined macros defined in `macros.py`:

#### Admonition Macro

```markdown
{{ ts_not_supported() }}
```

With a custom message:

```markdown
{{ ts_not_supported("Coming soon in TypeScript") }}
```

The default expands to an info admonition (default message shown):

```markdown
!!! info "Not supported in TypeScript"
    This feature is not supported in TypeScript.
```

#### Code Tab Macro

```markdown
=== "Python"
    ```python
    # Python-specific code
    ```

{{ ts_not_supported_code() }}
```

With a custom message:

```markdown
{{ ts_not_supported_code("Coming soon in TypeScript") }}
```

This expands to a TypeScript code tab (default message shown):

```markdown
=== "TypeScript"
    ```ts
    // Not supported in TypeScript
    ```
```

**Implementation:**
Both macros are defined in `macros.py` at the project root using the MkDocs macros plugin, which automatically makes them available in all markdown files.

## Agent/LLM Instructions

When adding TypeScript examples to documentation:

1. **Create the TypeScript file** with the same base name as the markdown file
2. **Add snippet markers** around code sections you want to reference
3. **Use descriptive snippet names** that clearly indicate the code's purpose
4. **Validate TypeScript** by running `npm run test`
5. **Update markdown** to use tabbed content with snippet inclusion
6. **Test locally** with `npm run dev` to ensure snippets render correctly

### Example Workflow

1. Edit `docs/path/to/example.ts`:
   ```typescript
   // --8<-- [start:new_feature]
   const feature = new Feature({ config: 'value' })
   // --8<-- [end:new_feature]
   ```

2. Update `docs/path/to/example.md`:
   ```markdown
   === "TypeScript"
       ```typescript
       --8<-- "path/to/example.ts:new_feature"
       ```
   ```

3. Validate: `npm run test`
4. Preview: `npm run dev`

## Benefits

- **Type Safety**: TypeScript compiler catches errors
- **DRY Principle**: Single source of truth for code examples
- **Consistency**: Automatic formatting and validation
- **Maintainability**: Changes to code automatically update documentation
- **IDE Support**: Full TypeScript language server support for code examples
