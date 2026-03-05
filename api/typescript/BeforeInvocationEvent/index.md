Defined in: [src/hooks/events.ts:98](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/hooks/events.ts#L98)

Event triggered at the beginning of a new agent request. Fired before any model inference or tool execution occurs.

## Extends

-   [`HookableEvent`](/api/typescript/HookableEvent/index.md)

## Constructors

### Constructor

```ts
new BeforeInvocationEvent(data): BeforeInvocationEvent;
```

Defined in: [src/hooks/events.ts:102](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/hooks/events.ts#L102)

#### Parameters

| Parameter | Type |
| --- | --- |
| `data` | { `agent`: [`AgentData`](/api/typescript/AgentData/index.md); } |
| `data.agent` | [`AgentData`](/api/typescript/AgentData/index.md) |

#### Returns

`BeforeInvocationEvent`

#### Overrides

[`HookableEvent`](/api/typescript/HookableEvent/index.md).[`constructor`](/api/typescript/HookableEvent/index.md#constructor)

## Properties

### type

```ts
readonly type: "beforeInvocationEvent";
```

Defined in: [src/hooks/events.ts:99](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/hooks/events.ts#L99)

---

### agent

```ts
readonly agent: AgentData;
```

Defined in: [src/hooks/events.ts:100](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/hooks/events.ts#L100)