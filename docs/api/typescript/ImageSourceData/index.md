```ts
type ImageSourceData =
  | {
  bytes: Uint8Array;
}
  | {
  s3Location: S3LocationData;
}
  | {
  url: string;
};
```

Defined in: [src/types/media.ts:174](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/types/media.ts#L174)

Source for an image (Data version). Supports multiple formats for different providers.