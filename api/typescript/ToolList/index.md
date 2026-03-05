```ts
type ToolList = (
  | Tool
  | McpClient
  | ToolList)[];
```

Defined in: [src/agent/agent.ts:62](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/agent/agent.ts#L62)

Recursive type definition for nested tool arrays. Allows tools to be organized in nested arrays of any depth.