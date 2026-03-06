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
  s3Location: S3LocationData;
};
```

Defined in: [src/types/media.ts:423](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/types/media.ts#L423)

Source for a document (Data version). Supports multiple formats including structured content.