Defined in: [src/models/model.ts:69](https://github.com/strands-agents/sdk-typescript/blob/fda985099c08f29d8604edcb75c8675e8eb998f4/strands-ts/src/models/model.ts#L69)

Configuration for prompt caching.

## Extended by

-   [`BedrockCacheConfig`](/docs/api/typescript/BedrockCacheConfig/index.md)

## Properties

### strategy

```ts
strategy: "auto" | "anthropic";
```

Defined in: [src/models/model.ts:76](https://github.com/strands-agents/sdk-typescript/blob/fda985099c08f29d8604edcb75c8675e8eb998f4/strands-ts/src/models/model.ts#L76)

Caching strategy to use.

-   “auto”: Automatically inject cache points at optimal positions based on model ID detection (after tools, after last user message)
-   “anthropic”: Force enable Anthropic-style caching (useful for application inference profiles)