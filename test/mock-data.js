/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */

export const mockVp = {
  '@context': 'https://www.w3.org/2018/credentials/v1',
  type: 'VerifiablePresentation',
  verifiableCredential: {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://w3id.org/cit/v1',
      'https://w3id.org/security/suites/ed25519-2020/v1'
    ],
    id: 'urn:uuid:188e8450-269e-11eb-b545-d3692cf35398',
    type: [
      'VerifiableCredential',
      'ConcealedIdTokenCredential'
    ],
    issuer: 'did:key:z6Mku2yHBpMvm13KqtupN7MNEj7Y7AREUWsFfGBRhyP9YZf7',
    issuanceDate: '2021-03-24T20:03:03Z',
    expirationDate: '2021-06-24T20:03:03Z',
    credentialSubject: {
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

export const encodedCborldBytes = 'VP1-B' +
  '1QDB811AN6JXS1S1S837R8VCI62H18C6HJ3YQ2YW0Q4E55TQPABSBH2EKJR3UEFANHD7D3' +
  'I56QMW2IK3R4G5MDWKJ2W31X4KW9AALAFDE6LZZ0MFQ52E6XZGV90R4GLQ7YYKSG9GYV36' +
  '6OJP1Q5TH3U7X6R29P93K52786Z74PA2QK9CB2JNHI91E2K647GDCZLE22PXM942Y9QU5I' +
  'RL2VHUXHLCM7MGG245T6N3QU43C3GEQUTCAJL9V56EGW243REGY1MHTN7LIBLHID0YJNKZ' +
  'GSX1G4YB2D8DPCO9463M2W1XK8QJIL963BIY7DHRN6X8H6GMV0ZXC33IF2N2D4Z352R3D3' +
  'V5Z6OE53YFRQ3NI7VX6N86PPPUNDG68H5HU6U30Q30RH6SP3ZI6S8KSYGJHMJRDF1O66VO' +
  'MEIS9Z9TE644MT5B3W9NN52ICR510O3JJSKJS8DUS97ILWEHU8Z63Q5E1SE9QB3QYX1FDZ' +
  '6QTQ2L96HTUI3KHFCSEPSYKT42ST95K1B57MTTI22GXSSG8KHZ3PG7HZ57L2CGHVT3LZC6' +
  '6XHV36AMF1M12X7AGRLC8LM1DGCJ202V5K7YUX7KYTYG8O5DW6CLG4E76J';

// eslint-disable-next-line max-len
export const expectedImageDataUrl = 'data:image/gif;base64,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';
