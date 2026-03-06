```ts
type SlidingWindowConversationManagerConfig = {
  windowSize?: number;
  shouldTruncateResults?: boolean;
};
```

Defined in: [src/conversation-manager/sliding-window-conversation-manager.ts:17](https://github.com/strands-agents/sdk-typescript/blob/1e39fd2194abd4b64787bb56d6fa62c1fa1c97f7/src/conversation-manager/sliding-window-conversation-manager.ts#L17)

Configuration for the sliding window conversation manager.

## Properties

### windowSize?

```ts
optional windowSize: number;
```

Defined in: [src/conversation-manager/sliding-window-conversation-manager.ts:22](https://github.com/strands-agents/sdk-typescript/blob/1e39fd2194abd4b64787bb56d6fa62c1fa1c97f7/src/conversation-manager/sliding-window-conversation-manager.ts#L22)

Maximum number of messages to keep in the conversation history. Defaults to 40 messages.

---

### shouldTruncateResults?

```ts
optional shouldTruncateResults: boolean;
```

Defined in: [src/conversation-manager/sliding-window-conversation-manager.ts:28](https://github.com/strands-agents/sdk-typescript/blob/1e39fd2194abd4b64787bb56d6fa62c1fa1c97f7/src/conversation-manager/sliding-window-conversation-manager.ts#L28)

Whether to truncate tool results when a message is too large for the model’s context window. Defaults to true.