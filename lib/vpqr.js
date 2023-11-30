/*!
 * Copyright (c) 2021-2023 Digital Bazaar, Inc. All rights reserved.
 */
import * as cborld from '@digitalbazaar/cborld';

import base32Encode from 'base32-encode';
import base32Decode from 'base32-decode';

import {
  Encoder,
  // QRByte,
  QRAlphanumeric,
  // ErrorCorrectionLevel
} from '@nuintun/qrcode';

const VP_QR_VERSION = 'VP1';
const BASE_32_UPPERCASE_MULTIBASE_PREFIX = 'B';

export async function toQrCode({
  vp, documentLoader, size, diagnose
} = {}) {
  const cborldBytes = await cborld.encode({
    jsonldDocument: vp,
    documentLoader,
    // to debug, set diagnose: console.log
    diagnose
  });

  const {
    payload,
    imageDataUrl,
    encodedCborld,
    version
  } = _bytesToQrCodeDataUrl({
    bytes: cborldBytes, size
  });

  return {
    payload,
    imageDataUrl,
    encodedCborld,
    rawCborldBytes: cborldBytes,
    version
  };
}

export async function fromQrCode({
  text, documentLoader, diagnose
} = {}) {
  const header = VP_QR_VERSION + '-';
  if(!(text && text.startsWith(header))) {
    throw TypeError('Unsupported VP QR format.');
  }

  const multibasePayload = text.slice(header.length);

  if(!multibasePayload.startsWith(BASE_32_UPPERCASE_MULTIBASE_PREFIX)) {
    throw TypeError('Payload must be multibase base32 (RFC4648) encoded.');
  }

  const cborldArrayBuffer = base32Decode(multibasePayload.slice(1), 'RFC4648');
  const cborldBytes = new Uint8Array(cborldArrayBuffer);

  const vp = await cborld.decode({
    cborldBytes,
    documentLoader,
    // to debug, set diagnose: console.log
    diagnose
  });

  return {vp};
}

function _bytesToQrCodeDataUrl({bytes, size}) {
  const qrcode = new Encoder();
  qrcode.setEncodingHint(true);
  // qrcode.setErrorCorrectionLevel(ErrorCorrectionLevel.M);
  const encoded = base32Encode(bytes, 'RFC4648', {padding: false});

  const vpPayload =
    `${VP_QR_VERSION}-${BASE_32_UPPERCASE_MULTIBASE_PREFIX}${encoded}`;

  qrcode.write(new QRAlphanumeric(vpPayload));

  qrcode.make();

  return {
    payload: vpPayload,
    encodedCborld: encoded,
    version: qrcode.getVersion(),
    imageDataUrl: qrcode.toDataURL(size)
  };
}
