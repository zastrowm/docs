```ts
type SystemPromptData = string | SystemContentBlockData[];
```

Defined in: [src/types/messages.ts:706](https://github.com/strands-agents/sdk-typescript/blob/fda985099c08f29d8604edcb75c8675e8eb998f4/strands-ts/src/types/messages.ts#L706)

Data representation of a system prompt. Can be a simple string or an array of system content block data for advanced caching.

This is the data interface counterpart to SystemPrompt, following the “Data” pattern.