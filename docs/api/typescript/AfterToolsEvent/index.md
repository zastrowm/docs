Defined in: [src/hooks/events.ts:410](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/hooks/events.ts#L410)

Event triggered after all tools complete execution. Fired after tool results are collected and ready to be added to conversation. Uses reverse callback ordering for proper cleanup semantics.

## Extends

-   [`HookableEvent`](/docs/api/typescript/HookableEvent/index.md)

## Constructors

### Constructor

```ts
new AfterToolsEvent(data): AfterToolsEvent;
```

Defined in: [src/hooks/events.ts:415](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/hooks/events.ts#L415)

#### Parameters

| Parameter | Type |
| --- | --- |
| `data` | { `agent`: [`AgentData`](/docs/api/typescript/AgentData/index.md); `message`: [`Message`](/docs/api/typescript/Message/index.md); } |
| `data.agent` | [`AgentData`](/docs/api/typescript/AgentData/index.md) |
| `data.message` | [`Message`](/docs/api/typescript/Message/index.md) |

#### Returns

`AfterToolsEvent`

#### Overrides

[`HookableEvent`](/docs/api/typescript/HookableEvent/index.md).[`constructor`](/docs/api/typescript/HookableEvent/index.md#constructor)

## Properties

### type

```ts
readonly type: "afterToolsEvent";
```

Defined in: [src/hooks/events.ts:411](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/hooks/events.ts#L411)

---

### agent

```ts
readonly agent: AgentData;
```

Defined in: [src/hooks/events.ts:412](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/hooks/events.ts#L412)

---

### message

```ts
readonly message: Message;
```

Defined in: [src/hooks/events.ts:413](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/hooks/events.ts#L413)