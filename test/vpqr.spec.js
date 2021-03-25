/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
import chai from 'chai';
chai.should();
const {expect} = chai;

import * as didKey from '@digitalbazaar/did-method-key';
import * as dl from '@transmute/jsonld-document-loader';
import citContext from 'cit-context';
import didContext from 'did-context';
import ed25519 from 'ed25519-signature-2020-context';

const didKeyDriver = didKey.driver();

// import {BASE_32_ALPHABET} from '../lib/vpqr.js';

import {toQrCode, fromQrCode} from '..';

import {
  exampleVp, exampleImageDataUrl, exampleQrCodeData
} from './mock-data.js';

const documentLoader = dl.documentLoaderFactory.pluginFactory
  .build({
    contexts: {
      ...dl.contexts.W3C_Verifiable_Credentials,
      'https://w3id.org/security/suites/ed25519-2020/v1': ed25519
        .contexts.get('https://w3id.org/security/suites/ed25519-2020/v1'),
      [didContext.constants.DID_CONTEXT_URL]: didContext
        .contexts.get('https://w3id.org/did/v0.11'),
      [citContext.constants.CONTEXT_URL]: citContext.contexts
        .get(citContext.constants.CONTEXT_URL)
    }
  })
  .addResolver({
    ['did:key']: {
      resolve: async did => didKeyDriver.get({did})
    }
  })
  .buildDocumentLoader();

describe('vpqr', () => {
  // describe('baseN', () => {
  //   it('should encode/decode', async () => {
  //     const bytes = new Uint8Array([0x74, 0x65, 0x73, 0x74]);
  //     console.log('baseN:', baseN.encode(bytes, BASE_32_ALPHABET));
  //     console.log('base32encode:', base32Encode(bytes.buffer, 'RFC4648',
  //       {padding: false}));
  //     console.log('hiBase32:', hiBase32.encode(bytes));
  //   });
  // });

  describe('toQrCode', () => {
    it('convert VP to an image data url', async () => {
      const {
        payload, imageDataUrl /*, encodedCborld, rawCborldBytes*/
      } = await toQrCode({vp: exampleVp, documentLoader});

      expect(payload).to.equal(exampleQrCodeData);
      expect(imageDataUrl).to.equal(exampleImageDataUrl);
    });
  });

  describe('fromQrCode', () => {
    it('convert from qr code payload to vp', async () => {
      const {vp} = await fromQrCode({
        text: exampleQrCodeData, documentLoader, diagnose: null
      });

      // console.log(vp);
      expect(vp).to.eql(exampleVp);
    });
  });
});
