Defined in: [src/models/streaming.ts:184](https://github.com/strands-agents/sdk-typescript/blob/6987b01d8ab113b5c0f336e0085579c60a7d0a57/strands-ts/src/models/streaming.ts#L184)

Data for a message stop event.

## Properties

### type

```ts
type: "modelMessageStopEvent";
```

Defined in: [src/models/streaming.ts:188](https://github.com/strands-agents/sdk-typescript/blob/6987b01d8ab113b5c0f336e0085579c60a7d0a57/strands-ts/src/models/streaming.ts#L188)

Discriminator for message stop events.

---

### stopReason

```ts
stopReason: StopReason;
```

Defined in: [src/models/streaming.ts:193](https://github.com/strands-agents/sdk-typescript/blob/6987b01d8ab113b5c0f336e0085579c60a7d0a57/strands-ts/src/models/streaming.ts#L193)

Reason why generation stopped.

---

### additionalModelResponseFields?

```ts
optional additionalModelResponseFields?: JSONValue;
```

Defined in: [src/models/streaming.ts:198](https://github.com/strands-agents/sdk-typescript/blob/6987b01d8ab113b5c0f336e0085579c60a7d0a57/strands-ts/src/models/streaming.ts#L198)

Additional provider-specific response fields.