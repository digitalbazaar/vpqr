/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
const cborld = require('@digitalbazaar/cborld');
const qrcode = require('@nuintun/qrcode');
import citContext from 'cit-context';

// import * as baseN from './base-n.js';
import base32Encode from 'base32-encode';
import base32Decode from 'base32-decode';

const {
  Encoder,
  // QRByte,
  QRAlphanumeric,
  // ErrorCorrectionLevel
} = qrcode;

const {appContextMap: citAppContextMap} = citContext;

const VP_QR_VERSION = 'VP1';
const base32uppercase = 'B'; // multibase prefix

// @see https://tools.ietf.org/html/rfc4648#section-6
// export const BASE_32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function _bytesToQrCodeDataUrl({bytes}) {
  const qrcode = new Encoder();
  qrcode.setEncodingHint(true);
  // qrcode.setErrorCorrectionLevel(ErrorCorrectionLevel.M);
  // const encoded = baseN.encode(bytes, BASE_32_ALPHABET);
  const encoded = base32Encode(bytes.buffer, 'RFC4648', {padding: false});

  const vpPayload = `${VP_QR_VERSION}-${base32uppercase}${encoded}`;

  qrcode.write(
    new QRAlphanumeric(vpPayload)
  );

  qrcode.make();

  return {
    payload: vpPayload, encodedCborld: encoded, imageDataUrl: qrcode.toDataURL()
  };
}

export async function toQrCode({
  vp, documentLoader, diagnose
} = {}) {
  const cborldBytes = await cborld.encode({
    jsonldDocument: vp,
    documentLoader,
    appContextMap: citAppContextMap,
    // to debug, set diagnose: console.log
    diagnose
  });

  const {payload, imageDataUrl, encodedCborld} = _bytesToQrCodeDataUrl({
    bytes: cborldBytes
  });

  return {payload, imageDataUrl, encodedCborld, rawCborldBytes: cborldBytes};
}

export async function fromQrCode({
  text, documentLoader, diagnose
} = {}) {
  const header = VP_QR_VERSION + '-';
  if(!(text && text.startsWith(header))) {
    throw TypeError('Unsupported VP QR format.');
  }

  const multibasePayload = text.slice(header.length);

  if(!multibasePayload.startsWith(base32uppercase)) {
    throw TypeError('Unsupported multibase encoding.');
  }

  const cborldArrayBuffer = base32Decode(multibasePayload.slice(1), 'RFC4648');
  const cborldBytes = new Uint8Array(cborldArrayBuffer);

  const vp = await cborld.decode({
    cborldBytes,
    documentLoader,
    appContextMap: citAppContextMap,
    // to debug, set diagnose: console.log
    diagnose
  });

  return {vp};
}
