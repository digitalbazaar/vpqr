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

const BASE_32_UPPERCASE_MULTIBASE_PREFIX = 'B';

export async function toQrCode({
  header, jsonldDocument, cborldBytes, documentLoader, size, diagnose
} = {}) {
  if(jsonldDocument && cborldBytes) {
    throw new Error(
      'Only one of "jsonldDocument" and "cborldBytes" is allowed.');
  }

  if(!cborldBytes) {
    cborldBytes = await cborld.encode({
      jsonldDocument,
      documentLoader,
      // to debug, set diagnose: console.log
      diagnose
    });
  }

  const {
    payload,
    imageDataUrl,
    encodedCborld,
    version
  } = _bytesToQrCodeDataUrl({
    header, bytes: cborldBytes, size
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
  expectedHeader = '', text, decodeCborld = true, documentLoader, diagnose
} = {}) {
  if(!(text && text.startsWith(expectedHeader))) {
    throw TypeError('Unsupported QR format.');
  }

  const multibasePayload = text.slice(expectedHeader.length);

  if(!multibasePayload.startsWith(BASE_32_UPPERCASE_MULTIBASE_PREFIX)) {
    throw TypeError('Payload must be multibase base32 (RFC4648) encoded.');
  }

  const cborldArrayBuffer = base32Decode(multibasePayload.slice(1), 'RFC4648');
  const cborldBytes = new Uint8Array(cborldArrayBuffer);
  if(!decodeCborld) {
    return {cborldBytes};
  }

  const jsonldDocument = await cborld.decode({
    cborldBytes,
    documentLoader,
    // to debug, set diagnose: console.log
    diagnose
  });
  return {jsonldDocument};
}

function _bytesToQrCodeDataUrl({header = '', bytes, size}) {
  const encoded = base32Encode(bytes, 'RFC4648', {padding: false});
  const vpPayload = `${header}${BASE_32_UPPERCASE_MULTIBASE_PREFIX}${encoded}`;

  const qrcode = new Encoder();
  qrcode.setEncodingHint(true);
  // qrcode.setErrorCorrectionLevel(ErrorCorrectionLevel.M);
  qrcode.write(new QRAlphanumeric(vpPayload));
  qrcode.make();

  return {
    payload: vpPayload,
    encodedCborld: encoded,
    version: qrcode.getVersion(),
    imageDataUrl: qrcode.toDataURL(size)
  };
}
