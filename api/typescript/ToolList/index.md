```ts
type ToolList = (
  | Tool
  | McpClient
  | ToolList)[];
```

Defined in: [src/agent/agent.ts:64](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/agent/agent.ts#L64)

Recursive type definition for nested tool arrays. Allows tools to be organized in nested arrays of any depth.