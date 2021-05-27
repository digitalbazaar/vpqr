/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */

export const exampleVp = {
  '@context': 'https://www.w3.org/2018/credentials/v1',
  type: 'VerifiablePresentation',
  verifiableCredential: {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://w3id.org/cit/v1',
      'https://w3id.org/age/v1',
      'https://w3id.org/security/suites/ed25519-2020/v1'
    ],
    id: 'urn:uuid:188e8450-269e-11eb-b545-d3692cf35398',
    type: [
      'VerifiableCredential',
      'OverAgeTokenCredential'
    ],
    issuer: 'did:key:z6Mku2yHBpMvm13KqtupN7MNEj7Y7AREUWsFfGBRhyP9YZf7',
    issuanceDate: '2021-03-24T20:03:03Z',
    expirationDate: '2021-06-24T20:03:03Z',
    credentialSubject: {
      overAge: 21,
      // eslint-disable-next-line max-len
      concealedIdToken: 'zo58FV8vqzY2ZqLT4fSaVhe7CsdBKsUikBMbKridqSyc7LceLmgWcNTeHm2gfvgjuNjrVif1G2A5EKx2eyNkSu5ZBc6gNnjF8ZkV3P8dPrX8o46SF'
    },
    proof: {
      type: 'Ed25519Signature2020',
      created: '2021-03-24T20:03:03Z',
      // eslint-disable-next-line max-len
      verificationMethod: 'did:key:z6Mku2yHBpMvm13KqtupN7MNEj7Y7AREUWsFfGBRhyP9YZf7#z6Mku2yHBpMvm13KqtupN7MNEj7Y7AREUWsFfGBRhyP9YZf7',
      proofPurpose: 'assertionMethod',
      // eslint-disable-next-line max-len
      proofValue: 'z5Z33Pi9zWUWMHdxhG1Ko7ssgeHsuT3ocyg46pJTTjbwk1YjjtSCa4CQ5UyjnkQ6ar5ohY5Kv2mncWbfgEqWcVrTQ'
    }
  }
};

// eslint-disable-next-line max-len
export const exampleQrCodeData = 'VP1-B3ECQDIYACEMHIGDODB6KQAMECEKRMFAYOCBAGUAYR2CFAJU6CHV3KROTNEWPGU4YDBZKKGDUDCEBRLA2MBNZV5YYWQMLUGFWLBAXVY5RUVGRLYGL5SM4XX3RXA5Z2QKONWS22N6WACXE3Z7LKV2NHJK4356VSTCXLDHT2L25PCCG7ZF5YMPAFEIQZPZWOXB4HYZG5ADBHIHRROEDDECACWBC5UA5RJTIKZ6NWSQ3XZPXTNLP63WDQ4BC6LWTWA5OSPJDUP6JMGGUMOSYELWQDWFGNBLHZW2KDO7F66NVN73OYODQELZO2OYDV2J5EOR7ZFQY2RR2DB2YEGDMDCCBRFFCDCBFQU323ECQDJABCUEQIB2KPLMQKANCAELAKGCBBBMDW6QAACV5MQQNMKGFGILW54G5OIG7OSBEROAI2S4UEXEPIWVUJNICT7VMUJ4NJ7GS2SGN6YL73LAPTFUBOV74RXTUV7NFFYSBRBQVDCMBUYGU4T3RRGQ2MBNZV5YYT2BBSBABLARO2AOYUZUFM7G3JIN34X3ZWVX7N3BYOARPF3J3AOXJHUR2H7EWDDKGHI';

// eslint-disable-next-line max-len
export const exampleImageDataUrl = 'data:image/gif;base64,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';
