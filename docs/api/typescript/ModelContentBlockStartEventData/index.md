Defined in: [src/models/streaming.ts:83](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/models/streaming.ts#L83)

Data for a content block start event.

## Properties

### type

```ts
type: "modelContentBlockStartEvent";
```

Defined in: [src/models/streaming.ts:87](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/models/streaming.ts#L87)

Discriminator for content block start events.

---

### start?

```ts
optional start: ToolUseStart;
```

Defined in: [src/models/streaming.ts:93](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/models/streaming.ts#L93)

Information about the content block being started. Only present for tool use blocks.