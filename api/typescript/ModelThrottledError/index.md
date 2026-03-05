Defined in: [src/errors.ts:121](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/errors.ts#L121)

Error thrown when a model provider returns a throttling or rate limit error.

This error indicates that the model API has rate limited the request. Users can handle this error in hooks to implement custom retry strategies using the `AfterModelCallEvent.retry` mechanism.

## Extends

-   [`ModelError`](/api/typescript/ModelError/index.md)

## Constructors

### Constructor

```ts
new ModelThrottledError(message, options?): ModelThrottledError;
```

Defined in: [src/errors.ts:128](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/errors.ts#L128)

Creates a new ModelThrottledError.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `message` | `string` | Error message describing the throttling condition |
| `options?` | `ErrorOptions` | Optional error options including cause for error chaining |

#### Returns

`ModelThrottledError`

#### Overrides

[`ModelError`](/api/typescript/ModelError/index.md).[`constructor`](/api/typescript/ModelError/index.md#constructor)