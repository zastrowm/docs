Defined in: [src/conversation-manager/null-conversation-manager.ts:16](https://github.com/strands-agents/sdk-typescript/blob/1e39fd2194abd4b64787bb56d6fa62c1fa1c97f7/src/conversation-manager/null-conversation-manager.ts#L16)

A no-op conversation manager that does not modify the conversation history. Implements HookProvider but registers zero hooks.

## Implements

-   [`HookProvider`](/docs/api/typescript/HookProvider/index.md)

## Constructors

### Constructor

```ts
new NullConversationManager(): NullConversationManager;
```

#### Returns

`NullConversationManager`

## Methods

### registerCallbacks()

```ts
registerCallbacks(_registry): void;
```

Defined in: [src/conversation-manager/null-conversation-manager.ts:23](https://github.com/strands-agents/sdk-typescript/blob/1e39fd2194abd4b64787bb56d6fa62c1fa1c97f7/src/conversation-manager/null-conversation-manager.ts#L23)

Registers callbacks with the hook registry. This implementation registers no hooks, providing a complete no-op behavior.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `_registry` | `HookRegistry` | The hook registry to register callbacks with (unused) |

#### Returns

`void`

#### Implementation of

[`HookProvider`](/docs/api/typescript/HookProvider/index.md).[`registerCallbacks`](/docs/api/typescript/HookProvider/index.md#registercallbacks)