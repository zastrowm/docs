Defined in: [src/hooks/events.ts:69](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/hooks/events.ts#L69)

Base class for events that can be subscribed to via the hook system. Only events extending this class are dispatched to [HookRegistry](/api/typescript/HookRegistry/index.md) callbacks. All current events extend this class. [StreamEvent](/api/typescript/StreamEvent/index.md) exists as the base for potential future stream-only events that should not be hookable.

## Extends

-   [`StreamEvent`](/api/typescript/StreamEvent/index.md)

## Extended by

-   [`InitializedEvent`](/api/typescript/InitializedEvent/index.md)
-   [`BeforeInvocationEvent`](/api/typescript/BeforeInvocationEvent/index.md)
-   [`AfterInvocationEvent`](/api/typescript/AfterInvocationEvent/index.md)
-   [`MessageAddedEvent`](/api/typescript/MessageAddedEvent/index.md)
-   [`BeforeToolCallEvent`](/api/typescript/BeforeToolCallEvent/index.md)
-   [`AfterToolCallEvent`](/api/typescript/AfterToolCallEvent/index.md)
-   [`BeforeModelCallEvent`](/api/typescript/BeforeModelCallEvent/index.md)
-   [`AfterModelCallEvent`](/api/typescript/AfterModelCallEvent/index.md)
-   [`BeforeToolsEvent`](/api/typescript/BeforeToolsEvent/index.md)
-   [`AfterToolsEvent`](/api/typescript/AfterToolsEvent/index.md)
-   [`ContentBlockEvent`](/api/typescript/ContentBlockEvent/index.md)
-   [`ModelMessageEvent`](/api/typescript/ModelMessageEvent/index.md)
-   [`ToolResultEvent`](/api/typescript/ToolResultEvent/index.md)
-   [`ToolStreamUpdateEvent`](/api/typescript/ToolStreamUpdateEvent/index.md)
-   [`AgentResultEvent`](/api/typescript/AgentResultEvent/index.md)
-   [`ModelStreamUpdateEvent`](/api/typescript/ModelStreamUpdateEvent/index.md)

## Constructors

### Constructor

```ts
new HookableEvent(): HookableEvent;
```

#### Returns

`HookableEvent`

#### Inherited from

[`StreamEvent`](/api/typescript/StreamEvent/index.md).[`constructor`](/api/typescript/StreamEvent/index.md#constructor)