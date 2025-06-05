# Ollama

Ollama is a framework for running open-source large language models locally. Strands provides native support for Ollama, allowing you to use locally-hosted models in your agents.

The [`OllamaModel`](../../../../api-reference/models/#strands.models.ollama) class in Strands enables seamless integration with Ollama's API, supporting:

- Text generation
- Image understanding
- Tool/function calling
- Streaming responses
- Configuration management

## Getting Started

### Prerequisites

First install the python client into your python environment:

```
pip install 'strands-agents[ollama]'

```

Next, you'll need to install and setup ollama itself.

#### Option 1: Native Installation

1. Install Ollama by following the instructions at [ollama.ai](https://ollama.ai)

1. Pull your desired model:

   ```
   ollama pull llama3

   ```

1. Start the Ollama server:

   ```
   ollama serve

   ```

#### Option 2: Docker Installation

1. Pull the Ollama Docker image:

   ```
   docker pull ollama/ollama

   ```

1. Run the Ollama container:

   ```
   docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

   ```

> Note: Add `--gpus=all` if you have a GPU and if Docker GPU support is configured.

1. Pull a model using the Docker container:

   ```
   docker exec -it ollama ollama pull llama3

   ```

1. Verify the Ollama server is running:

   ```
   curl http://localhost:11434/api/tags

   ```

## Basic Usage

Here's how to create an agent using an Ollama model:

```
from strands import Agent
from strands.models.ollama import OllamaModel

# Create an Ollama model instance
ollama_model = OllamaModel(
    host="http://localhost:11434",  # Ollama server address
    model_id="llama3"               # Specify which model to use
)

# Create an agent using the Ollama model
agent = Agent(model=ollama_model)

# Use the agent
agent("Tell me about Strands agents.") # Prints model output to stdout by default

```

## Configuration Options

The [`OllamaModel`](../../../../api-reference/models/#strands.models.ollama) supports various [configuration parameters](../../../../api-reference/models/#strands.models.ollama.OllamaModel.OllamaConfig):

| Parameter | Description | Default | | --- | --- | --- | | `host` | The address of the Ollama server | Required | | `model_id` | The Ollama model identifier | Required | | `keep_alive` | How long the model stays loaded in memory | "5m" | | `max_tokens` | Maximum number of tokens to generate | None | | `temperature` | Controls randomness (higher = more random) | None | | `top_p` | Controls diversity via nucleus sampling | None | | `stop_sequences` | List of sequences that stop generation | None | | `options` | Additional model parameters (e.g., top_k) | None | | `additional_args` | Any additional arguments for the request | None |

### Example with Configuration

```
from strands import Agent
from strands.models.ollama import OllamaModel

# Create a configured Ollama model
ollama_model = OllamaModel(
    host="http://localhost:11434",
    model_id="llama3",
    temperature=0.7,
    keep_alive="10m",
    stop_sequences=["###", "END"],
    options={"top_k": 40}
)

# Create an agent with the configured model
agent = Agent(model=ollama_model)

# Use the agent
response = agent("Write a short story about an AI assistant.")

```

## Advanced Features

### Updating Configuration at Runtime

You can update the model configuration during runtime:

```
# Create the model with initial configuration
ollama_model = OllamaModel(
    host="http://localhost:11434",
    model_id="llama3",
    temperature=0.7
)

# Update configuration later
ollama_model.update_config(
    temperature=0.9,
    top_p=0.8
)

```

This is especially useful if you want a tool to update the model's config for you:

```
@tool
def update_model_id(model_id: str, agent: Agent) -> str:
    """
    Update the model id of the agent

    Args:
      model_id: Ollama model id to use.
    """
    print(f"Updating model_id to {model_id}")
    agent.model.update_config(model_id=model_id)
    return f"Model updated to {model_id}"


@tool
def update_temperature(temperature: float, agent: Agent) -> str:
    """
    Update the temperature of the agent

    Args:
      temperature: Temperature value for the model to use.
    """
    print(f"Updating Temperature to {temperature}")
    agent.model.update_config(temperature=temperature)
    return f"Temperature updated to {temperature}"

```

### Using Different Models

Ollama supports many different models. You can switch between them (make sure they are pulled first). See the list of available models here: https://ollama.com/search

```
# Create models for different use cases
creative_model = OllamaModel(
    host="http://localhost:11434",
    model_id="llama3",
    temperature=0.8
)

factual_model = OllamaModel(
    host="http://localhost:11434",
    model_id="mistral",
    temperature=0.2
)

# Create agents with different models
creative_agent = Agent(model=creative_model)
factual_agent = Agent(model=factual_model)

```

## Tool Support

[Ollama models that support tool use](https://ollama.com/search?c=tools) can use tools through Strands's tool system:

```
from strands import Agent
from strands.models.ollama import OllamaModel
from strands_tools import calculator, current_time

# Create an Ollama model
ollama_model = OllamaModel(
    host="http://localhost:11434",
    model_id="llama3"
)

# Create an agent with tools
agent = Agent(
    model=ollama_model,
    tools=[calculator, current_time]
)

# Use the agent with tools
response = agent("What's the square root of 144 plus the current time?")

```

## Troubleshooting

### Common Issues

1. **Connection Refused**:

   - Ensure the Ollama server is running (`ollama serve` or check Docker container status)
   - Verify the host URL is correct
   - For Docker: Check if port 11434 is properly exposed

1. **Model Not Found**:

   - Pull the model first: `ollama pull model_name` or `docker exec -it ollama ollama pull model_name`
   - Check for typos in the model_id

1. **Module Not Found**:

   - If you encounter the error `ModuleNotFoundError: No module named 'ollama'`, this means you haven't installed the `ollama` dependency in your python environment
   - To fix, run `pip install 'strands-agents[ollama]'`

## Related Resources

- [Ollama Documentation](https://github.com/ollama/ollama/blob/main/README.md)
- [Ollama Docker Hub](https://hub.docker.com/r/ollama/ollama)
- [Available Ollama Models](https://ollama.ai/library)
