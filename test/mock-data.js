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

// eslint-disable-next-line max-len
export const exampleQrCodeData = 'VP1-B3ECQDIYACEMHIGDODB6KQAMDCEKRIGDQQIBVAGEOQRICNHQR5O2ULU3JFTZVHGAYOKSRQ5AYQQMKIGTALONPOGFMDCZBRLSYIF5OHMNFJUK6BS7MTHF564NYHOOUCTTNUWWTPVQAVZG6P22VOTJ2KXG7PVMUYV2YZ46S6XLYQRX6JPODDYBJCEGL6NTVYPB6GJXIAYJ2B4MLBAYZAQAVQIXNAHMKM2CWPTNUUG56L543K37W5Q4HAIXS5U5QHLUT2I5D7SLBRVDDUWBC5UA5RJTIKZ6NWSQ3XZPXTNLP63WDQ4BC6LWTWA5OSPJDUP6JMGGUMOQYOWBBQ3AYQAMIZIIYQJMFG6WZAUA2IAIVBECAOST23ECQDIQBCYCRQQIILA5XUAAAVPLEEDLCRRJSC5XPBXLSBX3UQJELQCGUXFBFZD2FVNCLKAU75LFCPDKPZUWURTPWC762YD4ZNALVP7EN45FP3JJOEQMJAGTA2TSPOGESDJQFXGXXDCLIEGIEAFMCF3IB3CTGQVT43NFBXPS7PG2W75XMHBYCF4XNHMB25E6SHI74SYMNIY5A';

// eslint-disable-next-line max-len
export const exampleImageDataUrl = 'data:image/gif;base64,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';
