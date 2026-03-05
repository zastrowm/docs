Defined in: [src/hooks/events.ts:340](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/hooks/events.ts#L340)

Event triggered when a tool execution completes. Wraps the tool result block after a tool finishes execution.

## Extends

-   [`HookableEvent`](/api/typescript/HookableEvent/index.md)

## Constructors

### Constructor

```ts
new ToolResultEvent(data): ToolResultEvent;
```

Defined in: [src/hooks/events.ts:345](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/hooks/events.ts#L345)

#### Parameters

| Parameter | Type |
| --- | --- |
| `data` | { `agent`: [`AgentData`](/api/typescript/AgentData/index.md); `result`: [`ToolResultBlock`](/api/typescript/ToolResultBlock/index.md); } |
| `data.agent` | [`AgentData`](/api/typescript/AgentData/index.md) |
| `data.result` | [`ToolResultBlock`](/api/typescript/ToolResultBlock/index.md) |

#### Returns

`ToolResultEvent`

#### Overrides

[`HookableEvent`](/api/typescript/HookableEvent/index.md).[`constructor`](/api/typescript/HookableEvent/index.md#constructor)

## Properties

### type

```ts
readonly type: "toolResultEvent";
```

Defined in: [src/hooks/events.ts:341](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/hooks/events.ts#L341)

---

### agent

```ts
readonly agent: AgentData;
```

Defined in: [src/hooks/events.ts:342](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/hooks/events.ts#L342)

---

### result

```ts
readonly result: ToolResultBlock;
```

Defined in: [src/hooks/events.ts:343](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/hooks/events.ts#L343)