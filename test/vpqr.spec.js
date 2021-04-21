/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
import chai from 'chai';
chai.should();
const {expect} = chai;

import {Ed25519Signature2020} from '@digitalbazaar/ed25519-signature-2020';
import vcjs from 'vc-js';

import {toQrCode, fromQrCode} from '..';

import {
  exampleVp, exampleImageDataUrl, exampleQrCodeData
} from './mock-data.js';

import {documentLoader} from './loader.js';

describe('vpqr', () => {
  describe('toQrCode', () => {
    it('convert VP to an image data url', async () => {
      const {
        version, payload, imageDataUrl/*, encodedCborld, rawCborldBytes*/
      } = await toQrCode({vp: exampleVp, documentLoader});
      expect(payload).to.equal(exampleQrCodeData);
      expect(imageDataUrl).to.equal(exampleImageDataUrl);
      expect(version).to.be.a('number');
      expect(version).to.equal(13);
    });
  });

  describe('fromQrCode', () => {
    it('convert from qr code payload to vp', async () => {
      const {vp} = await fromQrCode({
        text: exampleQrCodeData, documentLoader, diagnose: null
      });

      expect(vp).to.eql(exampleVp);

      // Verify signature
      const suite = new Ed25519Signature2020();
      const result = await vcjs.verify({
        presentation: vp,
        documentLoader,
        suite,
        unsignedPresentation: true
      });
      expect(result.verified).to.be.true;
    });
  });
});
