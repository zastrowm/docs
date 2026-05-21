Defined in: [src/errors.ts:39](https://github.com/strands-agents/sdk-typescript/blob/6987b01d8ab113b5c0f336e0085579c60a7d0a57/strands-ts/src/errors.ts#L39)

Error thrown when input exceeds the model’s context window.

This error indicates that the combined length of the input (prompt, messages, system prompt, and tool definitions) exceeds the maximum context window size supported by the model.

## Extends

-   [`ModelError`](/docs/api/typescript/ModelError/index.md)

## Constructors

### Constructor

```ts
new ContextWindowOverflowError(message): ContextWindowOverflowError;
```

Defined in: [src/errors.ts:45](https://github.com/strands-agents/sdk-typescript/blob/6987b01d8ab113b5c0f336e0085579c60a7d0a57/strands-ts/src/errors.ts#L45)

Creates a new ContextWindowOverflowError.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `message` | `string` | Error message describing the context overflow |

#### Returns

`ContextWindowOverflowError`

#### Overrides

[`ModelError`](/docs/api/typescript/ModelError/index.md).[`constructor`](/docs/api/typescript/ModelError/index.md#constructor)