# Verifiable Presentations to QR Code JS Lib _(@digitalbazaar/vpqr)_

[![Build Status](https://img.shields.io/github/actions/workflow/status/digitalbazaar/vpqr/main.yml)](https://github.com/digitalbazaar/vpqr/actions/workflows/main.yml)
[![Coverage Status](https://img.shields.io/codecov/c/github/digitalbazaar/vpqr)](https://codecov.io/gh/digitalbazaar/vpqr)
[![NPM Version](https://img.shields.io/npm/v/@digitalbazaar/vpqr)](https://www.npmjs.com/package/@digitalbazaar/vpqr)

> An isomorphic JS (for Node.js and browser) library that takes a Verifiable Presentation, compresses it via CBOR-LD, and turns it into a QR Code.

## Table of Contents

- [Background](#background)
- [Security](#security)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [Commercial Support](#commercial-support)
- [License](#license)

## Background

TBD

## Security

TBD

## Install

- Browsers and Node.js 14+ are supported.

To install from NPM:

```
npm install @digitalbazaar/vpqr
```

To install locally (for development):

```
git clone https://github.com/digitalbazaar/vpqr.git
cd vpqr
npm install
```

## Usage

### Encoding Verifiable Presentations as QR Code Images

```js
import vpqr from '@digitalbazaar/vpqr';

const vp = {
  "@context": "https://www.w3.org/2018/credentials/v1",
  "type": "VerifiablePresentation",
  "verifiableCredential": {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/cit/v1",
      "https://w3id.org/security/suites/ed25519-2020/v1"
    ],
    "id": "urn:uuid:188e8450-269e-11eb-b545-d3692cf35398",
    "type": [
      "VerifiableCredential",
      "ConcealedIdTokenCredential"
    ],
    "issuer": "did:key:z6Mku2yHBpMvm13KqtupN7MNEj7Y7AREUWsFfGBRhyP9YZf7",
    "issuanceDate": "2021-03-24T20:03:03Z",
    "expirationDate": "2021-06-24T20:03:03Z",
    "credentialSubject": {
      "concealedIdToken": "zo58FV8vqzY2ZqLT4fSaVhe7CsdBKsUikBMbKridqSyc7LceLmgWcNTeHm2gfvgjuNjrVif1G2A5EKx2eyNkSu5ZBc6gNnjF8ZkV3P8dPrX8o46SF"
    },
    "proof": {
      "type": "Ed25519Signature2020",
      "created": "2021-03-24T20:03:03Z",
      "verificationMethod": "did:key:z6Mku2yHBpMvm13KqtupN7MNEj7Y7AREUWsFfGBRhyP9YZf7#z6Mku2yHBpMvm13KqtupN7MNEj7Y7AREUWsFfGBRhyP9YZf7",
      "proofPurpose": "assertionMethod",
      "proofValue": "z5Z33Pi9zWUWMHdxhG1Ko7ssgeHsuT3ocyg46pJTTjbwk1YjjtSCa4CQ5UyjnkQ6ar5ohY5Kv2mncWbfgEqWcVrTQ"
    }
  }
};

// Set up your documentLoader
const documentLoader = {/*...*/};
const {imageDataUrl} = await vpqr.toQrCode({vp, documentLoader});
// data:image/gif;base64,R0lGODdhqgCqAIAAAAAAAP///ywAAAAAqgCqAAAC/4yPqcvt...
```

When these QR Codes are scanned, they are read as Alphanumeric mode text,

```
VP1-R3ECQDIYBCEMDGEAYG2UADAYRCV4DA2DUORYHGOR...
```

in the format:

```
<format and version, 'VP1-'><multibase prefix, 'R'><base45 RFC9285 encoded CBOR-LD>
```

### Decoding QR Code Text to Verifiable Presentation

```js
// Alphanumeric text from a QR Code Reader lib
const qrCodeText = 'VP1-R3ECQDIYBCEMDGEAYG2UADAYRCV4DA2DUORYHGOR...';

// Set up your documentLoader
const documentLoader = {/*...*/};

const {vp} = await vqpr.fromQrCode({text: qrCodeText, documentLoader});
// { "@context": "https://www.w3.org/2018/credentials/v1", ... }
// becomes a JSON object with the VP in the example above.
```

### Encoding Options

- `qrMultibaseEncoding`: Encoding for QR data. `B` for [RFC4648][] base32, `R`
  for [RFC9285][] base45. base45 is more efficient. Defaults to base45.
- `qrErrorCorrectionLevel`: Error correction level used in the QR code. 'L' Low
  7%, 'M' Medium 15%, 'Q' Qartile 25%, 'H' High 30%. Defaults to 'L'.
- `qrVersion`: QR version. 1-40 or 0 for auto. Defaults to auto.

## Contribute

See [the contribute file](https://github.com/digitalbazaar/bedrock/blob/master/CONTRIBUTING.md)!

PRs accepted.

If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## Commercial Support

Commercial support for this library is available upon request from
Digital Bazaar: support@digitalbazaar.com

## License

[New BSD License (3-clause)](LICENSE) © Digital Bazaar

[RFC4648]: https://datatracker.ietf.org/doc/rfc4648/
[RFC9285]: https://datatracker.ietf.org/doc/rfc9285/
