```ts
type InvokeArgs =
  | string
  | ContentBlock[]
  | ContentBlockData[]
  | Message[]
  | MessageData[]
  | InterruptResponseContent[]
  | InterruptResponseContentData[];
```

Defined in: [src/types/agent.ts:43](https://github.com/strands-agents/sdk-typescript/blob/fda985099c08f29d8604edcb75c8675e8eb998f4/strands-ts/src/types/agent.ts#L43)

Arguments for invoking an agent.

Supports multiple input formats:

-   `string` - User text input (wrapped in TextBlock, creates user Message)
-   `ContentBlock[]` | `ContentBlockData[]` - Array of content blocks (creates single user Message)
-   `Message[]` | `MessageData[]` - Array of messages (appends all to conversation)
-   `InterruptResponseContent[]` - Array of interrupt responses (resumes from interrupted state)