```ts
type DocumentSourceData =
  | {
  bytes: Uint8Array;
}
  | {
  text: string;
}
  | {
  content: DocumentContentBlockData[];
}
  | {
  location: S3LocationData;
};
```

Defined in: [src/types/media.ts:380](https://github.com/strands-agents/sdk-typescript/blob/fda985099c08f29d8604edcb75c8675e8eb998f4/strands-ts/src/types/media.ts#L380)

Source for a document (Data version). Supports multiple formats including structured content.