/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
const cborld = require('@digitalbazaar/cborld');
const qrcode = require('@nuintun/qrcode');
import citContext from 'cit-context';

import * as baseN from './base-n.js';

const {
  Encoder,
  // QRByte,
  QRAlphanumeric,
  // ErrorCorrectionLevel
} = qrcode;

const {appContextMap: citAppContextMap} = citContext;

const VP_QR_VERSION = 'VP1';

// @see https://tools.ietf.org/html/rfc4648#section-6
const BASE_32_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function _bytesToQrCodeDataUrl({bytes}) {
  const qrcode = new Encoder();
  qrcode.setEncodingHint(true);
  // qrcode.setErrorCorrectionLevel(ErrorCorrectionLevel.M);
  const encoded = baseN.encode(bytes, BASE_32_ALPHABET).toUpperCase();

  const base32uppercase = 'B'; // multibase prefix
  const vpPayload = `${VP_QR_VERSION}-${base32uppercase}${encoded}`;

  qrcode.write(
    new QRAlphanumeric(vpPayload)
  );

  qrcode.make();

  return {payload: vpPayload, imageDataUrl: qrcode.toDataURL()};
}

export async function toQrCode({
  vp, documentLoader, diagnose = console.log
} = {}) {
  const bytes = await cborld.encode({
    jsonldDocument: vp,
    documentLoader,
    appContextMap: citAppContextMap,
    diagnose
  });

  const {payload, imageDataUrl} = _bytesToQrCodeDataUrl({bytes});

  return {payload, imageDataUrl};
}

export async function fromQrCode() {}
