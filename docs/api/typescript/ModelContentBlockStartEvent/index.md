Defined in: [src/models/streaming.ts:99](https://github.com/strands-agents/sdk-typescript/blob/1e39fd2194abd4b64787bb56d6fa62c1fa1c97f7/src/models/streaming.ts#L99)

Event emitted when a new content block starts in the stream.

## Implements

-   [`ModelContentBlockStartEventData`](/docs/api/typescript/ModelContentBlockStartEventData/index.md)

## Properties

### type

```ts
readonly type: "modelContentBlockStartEvent";
```

Defined in: [src/models/streaming.ts:103](https://github.com/strands-agents/sdk-typescript/blob/1e39fd2194abd4b64787bb56d6fa62c1fa1c97f7/src/models/streaming.ts#L103)

Discriminator for content block start events.

#### Implementation of

```ts
ModelContentBlockStartEventData.type
```

---

### start?

```ts
readonly optional start: ToolUseStart;
```

Defined in: [src/models/streaming.ts:109](https://github.com/strands-agents/sdk-typescript/blob/1e39fd2194abd4b64787bb56d6fa62c1fa1c97f7/src/models/streaming.ts#L109)

Information about the content block being started. Only present for tool use blocks.

#### Implementation of

```ts
ModelContentBlockStartEventData.start
```