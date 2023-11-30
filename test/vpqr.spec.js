/*!
 * Copyright (c) 2021-2023 Digital Bazaar, Inc. All rights reserved.
 */
import chai from 'chai';
chai.should();
const {expect} = chai;

import * as vcjs from '@digitalbazaar/vc';
import * as cborld from '@digitalbazaar/cborld';
import {Ed25519Signature2020} from '@digitalbazaar/ed25519-signature-2020';

import {toQrCode, fromQrCode} from '../lib/index.js';
import {util} from '../lib/index.js';

import {
  exampleVp, exampleImageDataUrl, exampleQrCodeData
} from './mock-data.js';

import {documentLoader} from './loader.js';

describe('vpqr', () => {
  describe('toQrCode', () => {
    it('convert VP to an image data url', async () => {
      const {
        version, payload, imageDataUrl /*, encodedCborld, rawCborldBytes*/
      } = await toQrCode({vp: exampleVp, documentLoader, diagnose: null});
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

      // verify signature
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

describe('util', () => {
  describe('toQrCode', () => {
    it('convert any JSON-LD document to an image data url', async () => {
      const {
        version, payload, imageDataUrl /*, encodedCborld, rawCborldBytes*/
      } = await util.toQrCode({
        header: 'VP1-',
        jsonldDocument: exampleVp, documentLoader, diagnose: null
      });
      expect(payload).to.equal(exampleQrCodeData);
      expect(imageDataUrl).to.equal(exampleImageDataUrl);
      expect(version).to.be.a('number');
      expect(version).to.equal(13);
    });

    it('convert any CBOR-LD bytes to an image data url', async () => {
      const cborldBytes = await cborld.encode({
        jsonldDocument: exampleVp,
        documentLoader
      });

      const {
        version, payload, imageDataUrl /*, encodedCborld, rawCborldBytes*/
      } = await util.toQrCode({header: 'VP1-', cborldBytes});
      expect(payload).to.equal(exampleQrCodeData);
      expect(imageDataUrl).to.equal(exampleImageDataUrl);
      expect(version).to.be.a('number');
      expect(version).to.equal(13);
    });
  });

  describe('fromQrCode', () => {
    it('convert from qr code payload to JSON-LD document', async () => {
      const {jsonldDocument} = await util.fromQrCode({
        expectedHeader: 'VP1-',
        text: exampleQrCodeData, documentLoader, diagnose: null
      });

      expect(jsonldDocument).to.eql(exampleVp);

      // verify signature
      const suite = new Ed25519Signature2020();
      const result = await vcjs.verify({
        presentation: jsonldDocument,
        documentLoader,
        suite,
        unsignedPresentation: true
      });
      expect(result.verified).to.be.true;
    });

    it('convert from qr code payload to CBOR-LD bytes', async () => {
      const {cborldBytes} = await util.fromQrCode({
        expectedHeader: 'VP1-',
        decodeCborld: false,
        text: exampleQrCodeData, documentLoader, diagnose: null
      });

      const jsonldDocument = await cborld.decode({
        cborldBytes,
        documentLoader
      });
      expect(jsonldDocument).to.eql(exampleVp);

      // verify signature
      const suite = new Ed25519Signature2020();
      const result = await vcjs.verify({
        presentation: jsonldDocument,
        documentLoader,
        suite,
        unsignedPresentation: true
      });
      expect(result.verified).to.be.true;
    });
  });
});
