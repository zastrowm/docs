Defined in: [src/hooks/events.ts:113](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/hooks/events.ts#L113)

Event triggered at the end of an agent request. Fired after all processing completes, regardless of success or error. Uses reverse callback ordering for proper cleanup semantics.

## Extends

-   [`HookableEvent`](/api/typescript/HookableEvent/index.md)

## Constructors

### Constructor

```ts
new AfterInvocationEvent(data): AfterInvocationEvent;
```

Defined in: [src/hooks/events.ts:117](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/hooks/events.ts#L117)

#### Parameters

| Parameter | Type |
| --- | --- |
| `data` | { `agent`: [`AgentData`](/api/typescript/AgentData/index.md); } |
| `data.agent` | [`AgentData`](/api/typescript/AgentData/index.md) |

#### Returns

`AfterInvocationEvent`

#### Overrides

[`HookableEvent`](/api/typescript/HookableEvent/index.md).[`constructor`](/api/typescript/HookableEvent/index.md#constructor)

## Properties

### type

```ts
readonly type: "afterInvocationEvent";
```

Defined in: [src/hooks/events.ts:114](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/hooks/events.ts#L114)

---

### agent

```ts
readonly agent: AgentData;
```

Defined in: [src/hooks/events.ts:115](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/hooks/events.ts#L115)