Defined in: [src/types/media.ts:205](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/types/media.ts#L205)

Image content block.

## Implements

-   [`ImageBlockData`](/api/typescript/ImageBlockData/index.md)
-   `JSONSerializable`<{ `image`: `Serialized`<[`ImageBlockData`](/api/typescript/ImageBlockData/index.md)\>; }>

## Constructors

### Constructor

```ts
new ImageBlock(data): ImageBlock;
```

Defined in: [src/types/media.ts:221](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/types/media.ts#L221)

#### Parameters

| Parameter | Type |
| --- | --- |
| `data` | [`ImageBlockData`](/api/typescript/ImageBlockData/index.md) |

#### Returns

`ImageBlock`

## Properties

### type

```ts
readonly type: "imageBlock";
```

Defined in: [src/types/media.ts:209](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/types/media.ts#L209)

Discriminator for image content.

---

### format

```ts
readonly format: ImageFormat;
```

Defined in: [src/types/media.ts:214](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/types/media.ts#L214)

Image format.

#### Implementation of

[`ImageBlockData`](/api/typescript/ImageBlockData/index.md).[`format`](/api/typescript/ImageBlockData/index.md#format)

---

### source

```ts
readonly source: ImageSource;
```

Defined in: [src/types/media.ts:219](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/types/media.ts#L219)

Image source.

#### Implementation of

[`ImageBlockData`](/api/typescript/ImageBlockData/index.md).[`source`](/api/typescript/ImageBlockData/index.md#source)

## Methods

### toJSON()

```ts
toJSON(): {
  image: {
     format: ImageFormat;
     source:   | {
        bytes: string;
      }
        | {
        s3Location: {
           uri: string;
           bucketOwner?: string;
        };
      }
        | {
        url: string;
      };
  };
};
```

Defined in: [src/types/media.ts:253](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/types/media.ts#L253)

Serializes the ImageBlock to a JSON-compatible ContentBlockData object. Called automatically by JSON.stringify(). Uint8Array bytes are encoded as base64 string.

#### Returns

```ts
{
  image: {
     format: ImageFormat;
     source:   | {
        bytes: string;
      }
        | {
        s3Location: {
           uri: string;
           bucketOwner?: string;
        };
      }
        | {
        url: string;
      };
  };
}
```

| Name | Type | Description | Defined in |
| --- | --- | --- | --- |
| `image` | { `format`: [`ImageFormat`](/api/typescript/ImageFormat/index.md); `source`: | { `bytes`: `string`; } | { `s3Location`: { `uri`: `string`; `bucketOwner?`: `string`; }; } | { `url`: `string`; }; } | \- | [src/types/media.ts:253](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/types/media.ts#L253) |
| `image.format` | [`ImageFormat`](/api/typescript/ImageFormat/index.md) | Image format. | [src/types/media.ts:194](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/types/media.ts#L194) |
| `image.source` | | { `bytes`: `string`; } | { `s3Location`: { `uri`: `string`; `bucketOwner?`: `string`; }; } | { `url`: `string`; } | Image source. | [src/types/media.ts:199](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/types/media.ts#L199) |

#### Implementation of

```ts
JSONSerializable.toJSON
```

---

### fromJSON()

```ts
static fromJSON(data): ImageBlock;
```

Defined in: [src/types/media.ts:277](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/types/media.ts#L277)

Creates an ImageBlock instance from its wrapped data format. Base64-encoded bytes are decoded back to Uint8Array.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `data` | { `image`: { `format`: [`ImageFormat`](/api/typescript/ImageFormat/index.md); `source`: | { `bytes`: `string` | `Uint8Array`<`ArrayBufferLike`\>; } | { `s3Location`: { `uri`: `string`; `bucketOwner?`: `string`; }; } | { `url`: `string`; }; }; } | Wrapped ImageBlockData to deserialize (accepts both string and Uint8Array for bytes) |
| `data.image` | { `format`: [`ImageFormat`](/api/typescript/ImageFormat/index.md); `source`: | { `bytes`: `string` | `Uint8Array`<`ArrayBufferLike`\>; } | { `s3Location`: { `uri`: `string`; `bucketOwner?`: `string`; }; } | { `url`: `string`; }; } | \- |
| `data.image.format` | [`ImageFormat`](/api/typescript/ImageFormat/index.md) | Image format. |
| `data.image.source` | | { `bytes`: `string` | `Uint8Array`<`ArrayBufferLike`\>; } | { `s3Location`: { `uri`: `string`; `bucketOwner?`: `string`; }; } | { `url`: `string`; } | Image source. |

#### Returns

`ImageBlock`

ImageBlock instance