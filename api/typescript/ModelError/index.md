Defined in: [src/errors.ts:18](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/errors.ts#L18)

Base exception class for all model-related errors.

This class serves as the common base type for errors that originate from model provider interactions. By catching ModelError, consumers can handle all model-related errors uniformly while still having access to specific error types through instanceof checks.

## Extends

-   `Error`

## Extended by

-   [`ContextWindowOverflowError`](/api/typescript/ContextWindowOverflowError/index.md)
-   [`MaxTokensError`](/api/typescript/MaxTokensError/index.md)
-   [`ModelThrottledError`](/api/typescript/ModelThrottledError/index.md)

## Constructors

### Constructor

```ts
new ModelError(message, options?): ModelError;
```

Defined in: [src/errors.ts:25](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/errors.ts#L25)

Creates a new ModelError.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `message` | `string` | Error message describing the model error |
| `options?` | { `cause?`: `unknown`; } | Optional error options including the cause |
| `options.cause?` | `unknown` | \- |

#### Returns

`ModelError`

#### Overrides

```ts
Error.constructor
```