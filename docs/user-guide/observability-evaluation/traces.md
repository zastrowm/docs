# Traces

Tracing is a fundamental component of the Strands SDK's observability framework, providing detailed insights into your agent's execution. Using the OpenTelemetry standard, Strands traces capture the complete journey of a request through your agent, including LLM interactions, retrievers, tool usage, and event loop processing.

## Understanding Traces in Strands

Traces in Strands provide a hierarchical view of your agent's execution, allowing you to:

1. **Track the entire agent lifecycle**: From initial prompt to final response
2. **Monitor individual LLM calls**: Examine prompts, completions, and token usage
3. **Analyze tool execution**: Understand which tools were called, with what parameters, and their results
4. **Measure performance**: Identify bottlenecks and optimization opportunities
5. **Debug complex workflows**: Follow the exact path of execution through multiple cycles

Each trace consists of multiple spans that represent different operations in your agent's execution flow:

```
+-------------------------------------------------------------------------------------+
| Strands Agent                                                                       |
| - gen_ai.system: <system name>                                                      |
| - agent.name: <agent name>                                                          |
| - gen_ai.agent.name: <agent name>                                                   |
| - gen_ai.prompt: <user query>                                                       |
| - gen_ai.request.model: <model identifier>                                          |
| - system_prompt: <system instructions>                                              |
| - gen_ai.event.start_time: <timestamp>                                              |
| - gen_ai.event.end_time: <timestamp>                                                |
| - gen_ai.completion: <agent response>                                               |
| - gen_ai.usage.prompt_tokens: <number>                                              |
| - gen_ai.usage.completion_tokens: <number>                                          |
| - gen_ai.usage.total_tokens: <number>                                               |
|                                                                                     |
|  +-------------------------------------------------------------------------------+  |
|  | Cycle <cycle-id>                                                              |  |
|  | - gen_ai.prompt: <formatted prompt>                                           |  |
|  | - event_loop.cycle_id: <cycle identifier>                                     |  |
|  | - gen_ai.event.end_time: <timestamp>                                          |  |
|  | - tool.result: <tool result data>                                             |  |
|  | - gen_ai.completion: <formatted completion>                                   |  |
|  |                                                                               |  |
|  |  +-----------------------------------------------------------------------+    |  |
|  |  | Model invoke                                                          |    |  |
|  |  | - gen_ai.system: <system name>                                        |    |  |
|  |  | - agent.name: <agent name>                                            |    |  |
|  |  | - gen_ai.agent.name: <agent name>                                     |    |  |
|  |  | - gen_ai.prompt: <formatted prompt>                                   |    |  |
|  |  | - gen_ai.request.model: <model identifier>                            |    |  |
|  |  | - gen_ai.event.start_time: <timestamp>                                |    |  |
|  |  | - gen_ai.event.end_time: <timestamp>                                  |    |  |
|  |  | - gen_ai.completion: <model response with tool use>                   |    |  |
|  |  | - gen_ai.usage.prompt_tokens: <number>                                |    |  |
|  |  | - gen_ai.usage.completion_tokens: <number>                            |    |  |
|  |  | - gen_ai.usage.total_tokens: <number>                                 |    |  |
|  |  +-----------------------------------------------------------------------+    |  |
|  |                                                                               |  |
|  |  +-----------------------------------------------------------------------+    |  |
|  |  | Tool: <tool name>                                                     |    |  |
|  |  | - gen_ai.event.start_time: <timestamp>                                |    |  |
|  |  | - tool.name: <tool name>                                              |    |  |
|  |  | - tool.id: <tool use identifier>                                      |    |  |
|  |  | - tool.parameters: <tool parameters>                                  |    |  |
|  |  | - gen_ai.event.end_time: <timestamp>                                  |    |  |
|  |  | - tool.result: <tool execution result>                                |    |  |
|  |  | - gen_ai.completion: <formatted tool result>                          |    |  |
|  |  | - tool.status: <execution status>                                     |    |  |
|  |  +-----------------------------------------------------------------------+    |  |
|  +-------------------------------------------------------------------------------+  |
+-------------------------------------------------------------------------------------+
```

## OpenTelemetry Integration

Strands natively integrates with OpenTelemetry, an industry standard for distributed tracing. This integration provides:

1. **Compatibility with existing observability tools**: Send traces to platforms like Jaeger, Grafana Tempo, AWS X-Ray, Datadog, and more
2. **Standardized attribute naming**: Using the OpenTelemetry semantic conventions
3. **Flexible export options**: Console output for development, OTLP endpoint for production
4. **Auto-instrumentation**: Trace creation is handled automatically when you enable tracing

## Enabling Tracing

You can enable tracing either through environment variables or through code:

### Environment Variables

```bash

# Specify custom OTLP endpoint if set will enable OTEL by default
export OTEL_EXPORTER_OTLP_ENDPOINT="http://collector.example.com:4318"

# Enable Console debugging
export STRANDS_OTEL_ENABLE_CONSOLE_EXPORT=true

# Set Default OTLP Headers
export OTEL_EXPORTER_OTLP_HEADERS="key1=value1,key2=value2"

```

### Code Configuration

```python
from strands import Agent
from strands.telemetry.tracer import get_tracer

# Configure the tracer
tracer = get_tracer(
    service_name="my-agent-service",
    otlp_endpoint="http://localhost:4318",
    otlp_headers={"Authorization": "Bearer TOKEN"},
    enable_console_export=True  # Helpful for development
)

# Create agent (tracing will be enabled automatically)
agent = Agent(
    model="us.anthropic.claude-3-7-sonnet-20250219-v1:0",
    system_prompt="You are a helpful AI assistant"
)

# Use agent normally
response = agent("What can you help me with?")
```

## Trace Structure

Strands creates a hierarchical trace structure that mirrors the execution of your agent:
- **Agent Span**: The top-level span representing the entire agent invocation
      - Contains overall metrics like total token usage and cycle count
      - Captures the user prompt and final response

- **Cycle Spans**: Child spans for each event loop cycle
      - Tracks the progression of thought and reasoning
      - Shows the transformation from prompt to response

- **LLM Spans**: Model invocation spans
      - Contains prompt, completion, and token usage
      - Includes model-specific parameters

- **Tool Spans**: Tool execution spans
      - Captures tool name, parameters, and results
      - Measures tool execution time

## Captured Attributes

Strands traces include rich attributes that provide context for each operation:

### Agent-Level Attributes

| Attribute | Description |
|-----------|-------------|
| `gen_ai.system` | The agent system identifier ("strands-agents") |
| `agent.name` | Name of the agent |
| `gen_ai.agent.name` | Name of the agent (duplicate) |
| `gen_ai.prompt` | The user's initial prompt |
| `gen_ai.completion` | The agent's final response |
| `system_prompt` | System instructions for the agent |
| `gen_ai.request.model` | Model ID used by the agent |
| `gen_ai.event.start_time` | When agent processing began |
| `gen_ai.event.end_time` | When agent processing completed |
| `gen_ai.usage.prompt_tokens` | Total tokens used for prompts |
| `gen_ai.usage.completion_tokens` | Total tokens used for completions |
| `gen_ai.usage.total_tokens` | Total token usage |

### Cycle-Level Attributes

| Attribute | Description |
|-----------|-------------|
| `event_loop.cycle_id` | Unique identifier for the reasoning cycle |
| `gen_ai.prompt` | Formatted prompt for this reasoning cycle |
| `gen_ai.completion` | Model's response for this cycle |
| `gen_ai.event.end_time` | When the cycle completed |
| `tool.result` | Results from tool calls (if any) |

### Model Invoke Attributes

| Attribute | Description |
|-----------|-------------|
| `gen_ai.system` | The agent system identifier |
| `agent.name` | Name of the agent |
| `gen_ai.agent.name` | Name of the agent (duplicate) |
| `gen_ai.prompt` | Formatted prompt sent to the model |
| `gen_ai.request.model` | Model ID (e.g., "us.anthropic.claude-3-7-sonnet-20250219-v1:0") |
| `gen_ai.event.start_time` | When model invocation began |
| `gen_ai.event.end_time` | When model invocation completed |
| `gen_ai.completion` | Response from the model (may include tool calls) |
| `gen_ai.usage.prompt_tokens` | Tokens used for this prompt |
| `gen_ai.usage.completion_tokens` | Tokens generated in the completion |
| `gen_ai.usage.total_tokens` | Total tokens for this operation |

### Tool-Level Attributes

| Attribute | Description |
|-----------|-------------|
| `tool.name` | Name of the tool called |
| `tool.id` | Unique identifier for the tool call |
| `tool.parameters` | Parameters passed to the tool |
| `tool.result` | Result returned by the tool |
| `tool.status` | Execution status (success/error) |
| `gen_ai.event.start_time` | When tool execution began |
| `gen_ai.event.end_time` | When tool execution completed |
| `gen_ai.completion` | Formatted tool result |

## Visualization and Analysis

Traces can be visualized and analyzed using any OpenTelemetry-compatible tool:

![Trace Visualization](../../assets/trace_visualization.png)

Common visualization options include:

1. **Jaeger**: Open-source, end-to-end distributed tracing
2. **Langfuse**: For Traces, evals, prompt management, and metrics
3. **AWS X-Ray**: For AWS-based applications
4. **Zipkin**: Lightweight distributed tracing

## Local Development Setup

For development environments, you can quickly set up a local collector and visualization:

```bash
# Pull and run Jaeger all-in-one container
docker run -d --name jaeger \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 14250:14250 \
  -p 14268:14268 \
  -p 14269:14269 \
  -p 9411:9411 \
  jaegertracing/all-in-one:latest

```

Then access the Jaeger UI at http://localhost:16686 to view your traces.

You can also enable console export to inspect the spans:

```python
# By enabling the environment variable
os.environ["STRANDS_OTEL_ENABLE_CONSOLE_EXPORT"] = "true"

# or

# Configure the tracer
tracer = get_tracer(
    service_name="my-agent-service",
    otlp_endpoint="http://localhost:4318",
    otlp_headers={"Authorization": "Bearer TOKEN"},
    enable_console_export=True  # Helpful for development
)


```


## Advanced Configuration

### Sampling Control

For high-volume applications, you may want to implement sampling to reduce the volume of data to do this you can utilize the default [Open Telemetry Environment](https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/) variables:

```python
# Example: Sample 10% of traces
os.environ["OTEL_TRACES_SAMPLER"] = "traceidratio"
os.environ["OTEL_TRACES_SAMPLER_ARG"] = "0.5"


```

### Custom Attribute Tracking

You can add custom attributes to any span:

```python
agent = Agent(
    system_prompt="You are a helpful assistant that provides concise responses.",
    tools=[http_request, calculator],
    trace_attributes={
        "session.id": "abc-1234",
        "user.id": "user-email-example@domain.com",
        "tags": [
            "Agent-SDK",
            "Okatank-Project",
            "Observability-Tags",
        ]
    },
)
```

## Best Practices

1. **Use appropriate detail level**: Balance between capturing enough information and avoiding excessive data
2. **Add business context**: Include business-relevant attributes like customer IDs or transaction values
3. **Implement sampling**: For high-volume applications, use sampling to reduce data volume
4. **Secure sensitive data**: Avoid capturing PII or sensitive information in traces
5. **Correlate with logs and metrics**: Use trace IDs to link traces with corresponding logs
6. **Monitor storage costs**: Be aware of the data volume generated by traces

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Missing traces | Check that your collector endpoint is correct and accessible |
| Excessive data volume | Implement sampling or filter specific span types |
| Incomplete traces | Ensure all services in your workflow are properly instrumented |
| High latency | Consider using batching and asynchronous export |
| Missing context | Use context propagation to maintain trace context across services |

## Example: End-to-End Tracing

This example demonstrates capturing a complete trace of an agent interaction:

```python
from strands import Agent
import os

# Enable tracing with console output for visibility
os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"] = "http://localhost:4318"
os.environ["STRANDS_OTEL_ENABLE_CONSOLE_EXPORT"] = "true"

# Create agent
agent = Agent(
    model="us.anthropic.claude-3-7-sonnet-20250219-v1:0",
    system_prompt="You are a helpful AI assistant"
)

# Execute a series of interactions that will be traced
response = agent("Find me information about Mars. What is its atmosphere like?")
print(response)

# Ask a follow-up that uses tools
response = agent("Calculate how long it would take to travel from Earth to Mars at 100,000 km/h")
print(response)

# Each interaction creates a complete trace that can be visualized in your tracing tool
```
