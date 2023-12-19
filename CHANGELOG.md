# vpqr Changelog

## 4.1.0 - 2023-xx-xx

### Added
- Add passthrough of `cborld` `appContextMap` option.

## 4.0.0 - 2023-11-29

### Added
- Add utility API for generating QR codes with any prefix and any
  CBOR-LD compatible payload.

### Changed
- **BREAKING**: Use `cborld@6` which includes cryptosuite string and
  base64url multibase compression codecs. Any input data using these will
  change with this version (they will be compresed), otherwise no other
  changes should occur in payloads. Decoding should continue to work
  fine on uncompressed payloads.
- **BREAKING**: Require node 18+ (current non-EOL node versions).

## 3.0.0 - 2022-06-15

### Changed
- **BREAKING**: Convert to module (ESM).
- **BREAKING**: Require Node.js >=14.
- Update dependencies.
- Lint module.
- Update `@digitalbazaar/vc` test dependency to published `v3.0` package.
- Update all test deps involving contexts and crypto suites to newest major
  versions.
- Update unit test mock data and document loader.

## 2.1.0 - 2021-04-21

### Added
- toQrCode returns QR Code version.
- Added a test to assert on QR Code version.

## 2.0.0 - 2021-04-16

### Changed
- **BREAKING**: Uses new `cborld` v4.0 (which is based on the `cborg` lib).
  Changes in cborld compression algorithms, etc. (Not backwards-compatible
  with encodings done by vpqr v1.)

## 1.0.0 - 2021-04-01

### Added
- Initial commit.
