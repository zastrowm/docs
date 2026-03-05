Defined in: [src/hooks/events.ts:393](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/hooks/events.ts#L393)

Event triggered before executing tools. Fired when the model returns tool use blocks that need to be executed.

## Extends

-   [`HookableEvent`](/api/typescript/HookableEvent/index.md)

## Constructors

### Constructor

```ts
new BeforeToolsEvent(data): BeforeToolsEvent;
```

Defined in: [src/hooks/events.ts:398](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/hooks/events.ts#L398)

#### Parameters

| Parameter | Type |
| --- | --- |
| `data` | { `agent`: [`AgentData`](/api/typescript/AgentData/index.md); `message`: [`Message`](/api/typescript/Message/index.md); } |
| `data.agent` | [`AgentData`](/api/typescript/AgentData/index.md) |
| `data.message` | [`Message`](/api/typescript/Message/index.md) |

#### Returns

`BeforeToolsEvent`

#### Overrides

[`HookableEvent`](/api/typescript/HookableEvent/index.md).[`constructor`](/api/typescript/HookableEvent/index.md#constructor)

## Properties

### type

```ts
readonly type: "beforeToolsEvent";
```

Defined in: [src/hooks/events.ts:394](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/hooks/events.ts#L394)

---

### agent

```ts
readonly agent: AgentData;
```

Defined in: [src/hooks/events.ts:395](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/hooks/events.ts#L395)

---

### message

```ts
readonly message: Message;
```

Defined in: [src/hooks/events.ts:396](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/hooks/events.ts#L396)