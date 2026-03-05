```ts
type VideoSource =
  | {
  type: "videoSourceBytes";
  bytes: Uint8Array;
}
  | {
  type: "videoSourceS3Location";
  s3Location: S3Location;
};
```

Defined in: [src/types/media.ts:308](https://github.com/strands-agents/sdk-typescript/blob/97040b5a028fde61291c32106f76392515fb9984/src/types/media.ts#L308)

Source for a video (Class version).