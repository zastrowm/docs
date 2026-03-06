```ts
type VideoSourceData =
  | {
  bytes: Uint8Array;
}
  | {
  s3Location: S3LocationData;
};
```

Defined in: [src/types/media.ts:303](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/types/media.ts#L303)

Source for a video (Data version).