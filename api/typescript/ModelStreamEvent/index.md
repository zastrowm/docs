```ts
type ModelStreamEvent =
  | ModelMessageStartEventData
  | ModelContentBlockStartEventData
  | ModelContentBlockDeltaEventData
  | ModelContentBlockStopEventData
  | ModelMessageStopEventData
  | ModelMetadataEventData;
```

Defined in: [src/models/streaming.ts:19](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/models/streaming.ts#L19)

Union type representing all possible streaming events from a model provider. This is a discriminated union where each event has a unique type field.

This allows for type-safe event handling using switch statements.