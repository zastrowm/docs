```ts
type ContentBlock =
  | TextBlock
  | ToolUseBlock
  | ToolResultBlock
  | ReasoningBlock
  | CachePointBlock
  | GuardContentBlock
  | ImageBlock
  | VideoBlock
  | DocumentBlock
  | CitationsBlock;
```

Defined in: [src/types/messages.ts:153](https://github.com/strands-agents/sdk-typescript/blob/fda985099c08f29d8604edcb75c8675e8eb998f4/strands-ts/src/types/messages.ts#L153)