# @digitalbazaar/vpqr Changelog

## 6.0.0 - 2025-04-dd

### Changed
- **BREAKING**: The `format` parameter for encoding methods now defaults to
  `cbor-ld-1.0` to cause CBOR-LD 1.0 tag `0xcb1d` (`51997`) to be used. To
  use a pre-1.0 tag, set `format` to "legacy-range" or "legacy-singleton".

## 5.2.0 - 2025-04-24

### Added
- Add `format` parameter to encoding methods that can be passed a value of
  `cbor-ld-1.0` to cause CBOR-LD 1.0 tag `0xcb1d` (`51997`) to be used.

### Changed
- Use `@digitalbazaar/cborld@8`.

## 5.1.0 - 2024-10-21

### Changed
- Add support for `@digitalbazaar/cborld` `registryEntryId`, `typeTable`, and
  `typeTableLoader` options.

## 5.0.0 - 2024-08-29

### Added
- Add `toQrCode()` `margin` option to control image margin. Useful when
  displayed QR code quiet zone is handled by other means.

### Changed
- **BREAKING**: Use base45 encoding mode by default.
- **BREAKING**: Rename `toQrCode()` `size` option to `moduleSize` to avoid
  confusion with image size.
- **BREAKING**: Update to `@digitalbazaar/cborld@7`.
  - Includes encoder changes that may effect output QR codes in backwards
    incompatible ways depending on VC/VP data. See the cborld changelog for
    details.

## 4.2.0 - 2024-08-26

### Added
- Add RFC9285 base45 support for more efficient encoding than base32.
  - Defaulting to base32 until the next major release.
- More `toQrCode` options available:
  - `qrMultibaseEncoding`: Encoding for QR data. `B` for base32, `R` for
    base45. base45 is more efficient. Defaults to base32.
  - `qrErrorCorrectionLevel`: Error correction level used in the QR code. 'L'
    Low 7%, 'M' Medium 15%, 'Q' Qartile 25%, 'H' High 30%. Defaults to 'L'.
  - `qrVersion`: QR version. 1-40 or 0 for auto. Defaults to auto.

## 4.1.0 - 2023-12-19

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
