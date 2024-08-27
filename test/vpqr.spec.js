/*!
 * Copyright (c) 2021-2023 Digital Bazaar, Inc. All rights reserved.
 */
import chai from 'chai';
chai.should();
const {expect} = chai;

import * as cborld from '@digitalbazaar/cborld';
import * as vcjs from '@digitalbazaar/vc';
import {Ed25519Signature2020} from '@digitalbazaar/ed25519-signature-2020';

import {fromQrCode, toQrCode} from '../lib/index.js';
import {util} from '../lib/index.js';

import {
  exampleImageDataUrlB,
  exampleImageDataUrlR,
  exampleQrCodeDataB,
  exampleQrCodeDataR,
  exampleVp
} from './mock-data.js';

import {documentLoader} from './loader.js';

describe('vpqr', () => {
  describe('toQrCode', () => {
    it('convert VP to an image data url (b32)', async () => {
      const {
        version, payload, imageDataUrl /*, encodedCborld, rawCborldBytes*/
      } = await toQrCode({
        vp: exampleVp, documentLoader, qrMultibaseEncoding: 'B', diagnose: null
      });
      expect(payload).to.equal(exampleQrCodeDataB);
      expect(imageDataUrl).to.equal(exampleImageDataUrlB);
      expect(version).to.be.a('number');
      expect(version).to.equal(13);
    });
    it('convert VP to an image data url (b45)', async () => {
      const {
        version, payload, imageDataUrl /*, encodedCborld, rawCborldBytes*/
      } = await toQrCode({
        vp: exampleVp, documentLoader, qrMultibaseEncoding: 'R', diagnose: null
      });
      expect(payload).to.equal(exampleQrCodeDataR);
      expect(imageDataUrl).to.equal(exampleImageDataUrlR);
      expect(version).to.be.a('number');
      expect(version).to.equal(13);
    });
  });

  describe('fromQrCode', () => {
    it('convert from qr code payload to vp', async () => {
      const {vp} = await fromQrCode({
        text: exampleQrCodeDataB, documentLoader, diagnose: null
      });

      expect(vp).to.eql(exampleVp);

      // verify signature
      const suite = new Ed25519Signature2020();
      const result = await vcjs.verify({
        presentation: vp,
        documentLoader,
        suite,
        unsignedPresentation: true,
        now: Date.parse(vp?.verifiableCredential[0]?.issuanceDate)
      });
      expect(result.verified).to.be.true;
    });
  });
});

describe('util', () => {
  describe('toQrCode', () => {
    it('convert any JSON-LD document to an image data url (b32)', async () => {
      const {
        version, payload, imageDataUrl /*, encodedCborld, rawCborldBytes*/
      } = await util.toQrCode({
        header: 'VP1-',
        jsonldDocument: exampleVp, documentLoader, qrMultibaseEncoding: 'B',
        diagnose: null
      });
      expect(payload).to.equal(exampleQrCodeDataB);
      expect(imageDataUrl).to.equal(exampleImageDataUrlB);
      expect(version).to.be.a('number');
      expect(version).to.equal(13);
    });

    it('convert any JSON-LD document to an image data url (b45)', async () => {
      const {
        version, payload, imageDataUrl /*, encodedCborld, rawCborldBytes*/
      } = await util.toQrCode({
        header: 'VP1-',
        jsonldDocument: exampleVp, documentLoader, qrMultibaseEncoding: 'R',
        diagnose: null
      });
      expect(payload).to.equal(exampleQrCodeDataR);
      expect(imageDataUrl).to.equal(exampleImageDataUrlR);
      expect(version).to.be.a('number');
      expect(version).to.equal(13);
    });

    it('convert any CBOR-LD bytes to an image data url (b32)', async () => {
      const cborldBytes = await cborld.encode({
        jsonldDocument: exampleVp,
        documentLoader
      });

      const {
        version, payload, imageDataUrl /*, encodedCborld, rawCborldBytes*/
      } = await util.toQrCode({
        header: 'VP1-', cborldBytes, qrMultibaseEncoding: 'B'
      });
      expect(payload).to.equal(exampleQrCodeDataB);
      expect(imageDataUrl).to.equal(exampleImageDataUrlB);
      expect(version).to.be.a('number');
      expect(version).to.equal(13);
    });

    it('convert any CBOR-LD bytes to an image data url (b45)', async () => {
      const cborldBytes = await cborld.encode({
        jsonldDocument: exampleVp,
        documentLoader
      });

      const {
        version, payload, imageDataUrl /*, encodedCborld, rawCborldBytes*/
      } = await util.toQrCode({
        header: 'VP1-', cborldBytes, qrMultibaseEncoding: 'R'
      });
      expect(payload).to.equal(exampleQrCodeDataR);
      expect(imageDataUrl).to.equal(exampleImageDataUrlR);
      expect(version).to.be.a('number');
      expect(version).to.equal(13);
    });
  });

  describe('fromQrCode', () => {
    it('convert from qr code payload to JSON-LD document', async () => {
      const {jsonldDocument} = await util.fromQrCode({
        expectedHeader: 'VP1-',
        text: exampleQrCodeDataB, documentLoader, diagnose: null
      });

      expect(jsonldDocument).to.eql(exampleVp);

      // verify signature
      const suite = new Ed25519Signature2020();
      const result = await vcjs.verify({
        presentation: jsonldDocument,
        documentLoader,
        suite,
        unsignedPresentation: true,
        now: Date.parse(jsonldDocument?.verifiableCredential[0]?.issuanceDate)
      });
      expect(result.verified).to.be.true;
    });

    it('convert from qr code payload to CBOR-LD bytes', async () => {
      const {cborldBytes} = await util.fromQrCode({
        expectedHeader: 'VP1-',
        decodeCborld: false,
        text: exampleQrCodeDataB, documentLoader, diagnose: null
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
        unsignedPresentation: true,
        now: Date.parse(jsonldDocument?.verifiableCredential[0]?.issuanceDate)
      });
      expect(result.verified).to.be.true;
    });
  });
});
