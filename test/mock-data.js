/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */

export const exampleVp = {
  '@context': 'https://www.w3.org/2018/credentials/v1',
  type: 'VerifiablePresentation',
  verifiableCredential: {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
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
export const exampleQrCodeData = 'VP1-B3ECQDIYACEMHIGDODB6KQAMDCELBIGDQQIBVAGEOQRICNHQR5O2ULU3JFTZVHGAYOKSRQ5AYSIMLMGTALONPOGF6DDCBRQCYIF5OHMNFJUK6BS7MTHF564NYHOOUCTTNUWWTPVQAVZG6P22VOTJ2KXG7PVMUYV2YZ46S6XLYQRX6JPODDYBJCEGL6NTVYPB6GJXIAYJ2B4MMFAYZAQAVQIXNAHMKM2CWPTNUUG56L543K37W5Q4HAIXS5U5QHLUT2I5D7SLBRVDDUWBC5UA5RJTIKZ6NWSQ3XZPXTNLP63WDQ4BC6LWTWA5OSPJDUP6JMGGUMOQYOWBBQ3AYQAMJ5IQYQZMFG6WZAUA2IAIVBECAOST23ECQDIQBCYCRQQIILA5XUAAAVPLEEDLCRRJSC5XPBXLSBX3UQJELQCGUXFBFZD2FVNCLKAU75LFCPDKPZUWURTPWC762YD4ZNALVP7EN45FP3JJOEQMJAFIYUINGBVHE64MKIGTALONPOGFIQIMQIAKYELWQDWFGNBLHZW2KDO7F66NVN73OYODQELZO2OYDV2J5EOR7ZFQY2RR2';

// eslint-disable-next-line max-len
export const exampleImageDataUrl = 'data:image/gif;base64,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';
