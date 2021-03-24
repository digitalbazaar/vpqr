/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
import chai from 'chai';
chai.should();
const {expect} = chai;

const didKeyDriver = require('@digitalbazaar/did-method-key').driver();
const dl = require('@transmute/jsonld-document-loader');
import citContext from 'cit-context';
import didContext from 'did-context';
import ed25519 from 'ed25519-signature-2020-context';

import {toQrCode} from '..';

import {mockVp, expectedImageDataUrl, encodedCborldBytes} from './mock-data.js';

const DEFAULT_DOCUMENT_LOADER = dl.documentLoaderFactory.pluginFactory
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
  describe('toQrCode', () => {
    it('convert VP to an image data url', async () => {
      const {payload, imageDataUrl} = await toQrCode({
        vp: mockVp, documentLoader: DEFAULT_DOCUMENT_LOADER, diagnose: null
      });

      expect(payload).to.equal(encodedCborldBytes);
      expect(imageDataUrl).to.equal(expectedImageDataUrl);
    });
  });
});
