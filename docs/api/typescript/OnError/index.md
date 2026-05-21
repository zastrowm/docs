```ts
type OnError = "throw" | "proceed" | "deny";
```

Defined in: [src/interventions/handler.ts:19](https://github.com/strands-agents/sdk-typescript/blob/6987b01d8ab113b5c0f336e0085579c60a7d0a57/strands-ts/src/interventions/handler.ts#L19)

What to do when a handler throws during evaluation.

-   `'throw'` — rethrow the error (default, safest: a broken policy check blocks execution)
-   `'proceed'` — log the error and continue as if the handler returned Proceed
-   `'deny'` — log the error and treat it as a Deny (fail-closed)