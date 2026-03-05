Defined in: [src/types/media.ts:132](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/types/media.ts#L132)

S3 location for Bedrock media and document sources.

## Implements

-   [`S3LocationData`](/api/typescript/S3LocationData/index.md)
-   `JSONSerializable`<[`S3LocationData`](/api/typescript/S3LocationData/index.md)\>

## Constructors

### Constructor

```ts
new S3Location(data): S3Location;
```

Defined in: [src/types/media.ts:136](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/types/media.ts#L136)

#### Parameters

| Parameter | Type |
| --- | --- |
| `data` | [`S3LocationData`](/api/typescript/S3LocationData/index.md) |

#### Returns

`S3Location`

## Properties

### uri

```ts
readonly uri: string;
```

Defined in: [src/types/media.ts:133](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/types/media.ts#L133)

S3 URI in format: s3://bucket-name/key-name

#### Implementation of

[`S3LocationData`](/api/typescript/S3LocationData/index.md).[`uri`](/api/typescript/S3LocationData/index.md#uri)

---

### bucketOwner?

```ts
readonly optional bucketOwner: string;
```

Defined in: [src/types/media.ts:134](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/types/media.ts#L134)

AWS account ID of the S3 bucket owner (12-digit). Required if the bucket belongs to another AWS account.

#### Implementation of

[`S3LocationData`](/api/typescript/S3LocationData/index.md).[`bucketOwner`](/api/typescript/S3LocationData/index.md#bucketowner)

## Methods

### toJSON()

```ts
toJSON(): S3LocationData;
```

Defined in: [src/types/media.ts:147](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/types/media.ts#L147)

Serializes the S3Location to a JSON-compatible S3LocationData object. Called automatically by JSON.stringify().

#### Returns

[`S3LocationData`](/api/typescript/S3LocationData/index.md)

#### Implementation of

```ts
JSONSerializable.toJSON
```

---

### fromJSON()

```ts
static fromJSON(data): S3Location;
```

Defined in: [src/types/media.ts:160](https://github.com/strands-agents/sdk-typescript/blob/3d31e16991c3f9724599e58789ad8dcd94fe06b3/src/types/media.ts#L160)

Creates an S3Location instance from S3LocationData.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `data` | [`S3LocationData`](/api/typescript/S3LocationData/index.md) | S3LocationData to deserialize |

#### Returns

`S3Location`

S3Location instance