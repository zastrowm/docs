Defined in: [src/tools/tool.ts:29](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/tools/tool.ts#L29)

Data for a tool stream event.

## Properties

### type

```ts
type: "toolStreamEvent";
```

Defined in: [src/tools/tool.ts:33](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/tools/tool.ts#L33)

Discriminator for tool stream events.

---

### data?

```ts
optional data: unknown;
```

Defined in: [src/tools/tool.ts:39](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/tools/tool.ts#L39)

Caller-provided data for the progress update. Can be any type of data the tool wants to report.