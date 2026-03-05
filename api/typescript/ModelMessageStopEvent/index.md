Defined in: [src/models/streaming.ts:202](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/models/streaming.ts#L202)

Event emitted when the message completes.

## Implements

-   [`ModelMessageStopEventData`](/api/typescript/ModelMessageStopEventData/index.md)

## Properties

### type

```ts
readonly type: "modelMessageStopEvent";
```

Defined in: [src/models/streaming.ts:206](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/models/streaming.ts#L206)

Discriminator for message stop events.

#### Implementation of

```ts
ModelMessageStopEventData.type
```

---

### stopReason

```ts
readonly stopReason: StopReason;
```

Defined in: [src/models/streaming.ts:211](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/models/streaming.ts#L211)

Reason why generation stopped.

#### Implementation of

```ts
ModelMessageStopEventData.stopReason
```

---

### additionalModelResponseFields?

```ts
readonly optional additionalModelResponseFields: JSONValue;
```

Defined in: [src/models/streaming.ts:216](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/models/streaming.ts#L216)

Additional provider-specific response fields.

#### Implementation of

```ts
ModelMessageStopEventData.additionalModelResponseFields
```