# A CLI reference implementation of a Strands agent

The Strands CLI is a reference implementation built on top of the Strands SDK. It provides a terminal-based interface for interacting with Strands agents, demonstrating how to make a fully interactive streaming application with the Strands SDK.

The Strands CLI is Open-Source and available [strands-agents/agent-builder](https://github.com/strands-agents/agent-builder#custom-model-provider).

## Prerequisites

Before installing the Strands CLI, ensure you have:

- Python 3.10 or higher
- pip (Python package installer)
- git
- AWS account with Bedrock access (for using Bedrock models)
- AWS credentials configured (for AWS integrations)

## Standard Installation

To install the Strands CLI:

```
# Install
pipx install strands-agents-builder

# Run Strands CLI
strands

```

## Manual Installation

If you prefer to install manually:

```
# Clone repository
git clone https://github.com/strands-agents/agent-builder /path/to/custom/location

# Create virtual environment
cd /path/to/custom/location
python -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -e .

# Create symlink
sudo ln -sf /path/to/custom/location/venv/bin/strands /usr/local/bin/strands

```

## CLI Verification

To verify your CLI installation:

```
# Run Strands CLI with a simple query
strands "Hello, Strands!"

```

## Command Line Arguments

| Argument | Description | Example | | --- | --- | --- | | `query` | Question or command for Strands | `strands "What's the current time?"` | | `--kb`, `--knowledge-base` | `KNOWLEDGE_BASE_ID` | Knowledge base ID to use for retrievals | | `--model-provider` | `MODEL_PROVIDER` | Model provider to use for inference | | `--model-config` | `MODEL_CONFIG` | Model config as JSON string or path |

## Interactive Mode Commands

When running Strands in interactive mode, you can use these special commands:

| Command | Description | | --- | --- | | `exit` | Exit Strands CLI | | `!command` | Execute shell command directly |

## Shell Integration

Strands CLI integrates with your shell in several ways:

### Direct Shell Commands

Execute shell commands directly by prefixing with `!`:

```
> !ls -la
> !git status
> !docker ps

```

### Natural Language Shell Commands

Ask Strands to run shell commands using natural language:

```
> Show me all running processes
> Create a new directory called "project" and initialize a git repository there
> Find all Python files modified in the last week

```

## Environment Variables

Strands CLI respects these environment variables for basic configuration:

| Variable | Description | Default | | --- | --- | --- | | `STRANDS_SYSTEM_PROMPT` | System instructions for the agent | `You are a helpful agent.` | | `STRANDS_KNOWLEDGE_BASE_ID` | Knowledge base for memory integration | None |

Example:

```
export STRANDS_KNOWLEDGE_BASE_ID="YOUR_KB_ID"
strands "What were our key decisions last week?"

```

## Command Line Arguments

Command line arguments override any configuration from files or environment variables:

```
# Enable memory with knowledge base
strands --kb your-kb-id

```

## Custom Model Provider

You can configure strands to use a different model provider with specific settings by passing in the following arguments:

```
strands --model-provider <NAME> --model-config <JSON|FILE>

```

As an example, if you wanted to use the packaged Ollama provider with a specific model id, you would run:

```
strands --model-provider ollama --model-config '{"model_id": "llama3.3"}'

```

Strands is packaged with `bedrock` and `ollama` as providers.
