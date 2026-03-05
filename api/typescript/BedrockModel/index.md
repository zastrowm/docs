Defined in: [src/models/bedrock.ts:243](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/models/bedrock.ts#L243)

AWS Bedrock model provider implementation.

Implements the Model interface for AWS Bedrock using the Converse Stream API. Supports streaming responses, tool use, prompt caching, and comprehensive error handling.

## Example

```typescript
const provider = new BedrockModel({
  modelConfig: {
    modelId: 'global.anthropic.claude-sonnet-4-5-20250929-v1:0',
    maxTokens: 1024,
    temperature: 0.7
  },
  clientConfig: {
    region: 'us-west-2'
  }
})

const messages: Message[] = [
  { type: 'message', role: 'user', content: [{ type: 'textBlock', text: 'Hello!' }] }
]

for await (const event of provider.stream(messages)) {
  if (event.type === 'modelContentBlockDeltaEvent' && event.delta.type === 'textDelta') {
    process.stdout.write(event.delta.text)
  }
}
```

## Extends

-   [`Model`](/api/typescript/Model/index.md)<[`BedrockModelConfig`](/api/typescript/BedrockModelConfig/index.md)\>

## Constructors

### Constructor

```ts
new BedrockModel(options?): BedrockModel;
```

Defined in: [src/models/bedrock.ts:277](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/models/bedrock.ts#L277)

Creates a new BedrockModel instance.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `options?` | [`BedrockModelOptions`](/api/typescript/BedrockModelOptions/index.md) | Optional configuration for model and client |

#### Returns

`BedrockModel`

#### Example

```typescript
// Minimal configuration with defaults
const provider = new BedrockModel({
  region: 'us-west-2'
})

// With model configuration
const provider = new BedrockModel({
  region: 'us-west-2',
  modelId: 'global.anthropic.claude-sonnet-4-5-20250929-v1:0',
  maxTokens: 2048,
  temperature: 0.8,
  cachePrompt: 'ephemeral'
})

// With client configuration
const provider = new BedrockModel({
  region: 'us-east-1',
  clientConfig: {
    credentials: myCredentials
  }
})
```

#### Overrides

[`Model`](/api/typescript/Model/index.md).[`constructor`](/api/typescript/Model/index.md#constructor)

## Accessors

### modelId

#### Get Signature

```ts
get modelId(): string;
```

Defined in: [src/models/model.ts:150](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/models/model.ts#L150)

The model ID from the current configuration, if configured.

##### Returns

`string`

#### Inherited from

[`Model`](/api/typescript/Model/index.md).[`modelId`](/api/typescript/Model/index.md#modelid)

## Methods

### updateConfig()

```ts
updateConfig(modelConfig): void;
```

Defined in: [src/models/bedrock.ts:323](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/models/bedrock.ts#L323)

Updates the model configuration. Merges the provided configuration with existing settings.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `modelConfig` | [`BedrockModelConfig`](/api/typescript/BedrockModelConfig/index.md) | Configuration object with model-specific settings to update |

#### Returns

`void`

#### Example

```typescript
// Update temperature and maxTokens
provider.updateConfig({
  temperature: 0.9,
  maxTokens: 2048
})
```

#### Overrides

[`Model`](/api/typescript/Model/index.md).[`updateConfig`](/api/typescript/Model/index.md#updateconfig)

---

### getConfig()

```ts
getConfig(): BedrockModelConfig;
```

Defined in: [src/models/bedrock.ts:338](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/models/bedrock.ts#L338)

Retrieves the current model configuration.

#### Returns

[`BedrockModelConfig`](/api/typescript/BedrockModelConfig/index.md)

The current configuration object

#### Example

```typescript
const config = provider.getConfig()
console.log(config.modelId)
```

#### Overrides

[`Model`](/api/typescript/Model/index.md).[`getConfig`](/api/typescript/Model/index.md#getconfig)

---

### stream()

```ts
stream(messages, options?): AsyncIterable<ModelStreamEvent>;
```

Defined in: [src/models/bedrock.ts:371](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/models/bedrock.ts#L371)

Streams a conversation with the Bedrock model. Returns an async iterable that yields streaming events as they occur.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `messages` | [`Message`](/api/typescript/Message/index.md)\[\] | Array of conversation messages |
| `options?` | [`StreamOptions`](/api/typescript/StreamOptions/index.md) | Optional streaming configuration |

#### Returns

`AsyncIterable`<[`ModelStreamEvent`](/api/typescript/ModelStreamEvent/index.md)\>

Async iterable of streaming events

#### Throws

{ContextWindowOverflowError} When input exceeds the model’s context window

#### Throws

{ModelThrottledError} When Bedrock service throttles requests

#### Example

```typescript
const messages: Message[] = [
  { type: 'message', role: $1, content: [{ type: 'textBlock', text: 'What is 2+2?' }] }
]

const options: StreamOptions = {
  systemPrompt: 'You are a helpful math assistant.',
  toolSpecs: [calculatorTool]
}

for await (const event of provider.stream(messages, options)) {
  if (event.type === 'modelContentBlockDeltaEvent') {
    console.log(event.delta)
  }
}
```

#### Overrides

[`Model`](/api/typescript/Model/index.md).[`stream`](/api/typescript/Model/index.md#stream)

---

### streamAggregated()

```ts
streamAggregated(messages, options?): AsyncGenerator<
  | ContentBlock
| ModelStreamEvent, StreamAggregatedResult, undefined>;
```

Defined in: [src/models/model.ts:216](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/models/model.ts#L216)

Streams a conversation with aggregated content blocks and messages. Returns an async generator that yields streaming events and content blocks, and returns the final message with stop reason and optional metadata.

This method enhances the basic stream() by collecting streaming events into complete ContentBlock and Message objects, which are needed by the agentic loop for tool execution and conversation management.

The method yields:

-   ModelStreamEvent - Original streaming events (passed through)
-   ContentBlock - Complete content block (emitted when block completes)

The method returns:

-   StreamAggregatedResult containing the complete message, stop reason, and optional metadata

All exceptions thrown from this method are wrapped in ModelError to provide a consistent error type for model-related errors. Specific error subtypes like ContextWindowOverflowError, ModelThrottledError, and MaxTokensError are preserved.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `messages` | [`Message`](/api/typescript/Message/index.md)\[\] | Array of conversation messages |
| `options?` | [`StreamOptions`](/api/typescript/StreamOptions/index.md) | Optional streaming configuration |

#### Returns

`AsyncGenerator`< | [`ContentBlock`](/api/typescript/ContentBlock/index.md) | [`ModelStreamEvent`](/api/typescript/ModelStreamEvent/index.md), `StreamAggregatedResult`, `undefined`\>

Async generator yielding ModelStreamEvent | ContentBlock and returning a StreamAggregatedResult

#### Throws

ModelError - Base class for all model-related errors

#### Throws

ContextWindowOverflowError - When input exceeds the model’s context window

#### Throws

ModelThrottledError - When the model provider throttles requests

#### Throws

MaxTokensError - When the model reaches its maximum token limit

#### Inherited from

[`Model`](/api/typescript/Model/index.md).[`streamAggregated`](/api/typescript/Model/index.md#streamaggregated)