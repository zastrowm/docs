```ts
type McpClientConfig = RuntimeConfig & {
  transport: Transport;
  disableMcpInstrumentation?: boolean;
};
```

Defined in: [src/mcp.ts:16](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/mcp.ts#L16)

Arguments for configuring an MCP Client.

## Type Declaration

| Name | Type | Description | Defined in |
| --- | --- | --- | --- |
| `transport` | `Transport` | \- | [src/mcp.ts:17](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/mcp.ts#L17) |
| `disableMcpInstrumentation?` | `boolean` | Disable OpenTelemetry MCP instrumentation. | [src/mcp.ts:20](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/mcp.ts#L20) |