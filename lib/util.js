/*!
 * Copyright (c) 2021-2024 Digital Bazaar, Inc. All rights reserved.
 */
import * as cborld from '@digitalbazaar/cborld';
import {
  decode as base45Decode,
  encode as base45Encode
} from '@digitalbazaar/base45';
import {
  Encoder,
  ErrorCorrectionLevel,
  // QRByte,
  QRAlphanumeric
} from '@nuintun/qrcode';
import base32Decode from 'base32-decode';
import base32Encode from 'base32-encode';

const BASE_32_UPPERCASE_MULTIBASE_PREFIX = 'B';
const BASE_45_MULTIBASE_PREFIX = 'R';

/**
 * Encode to a QR code.
 *
 * @param {object} options - Encoding options.
 * @param {object} options.header - Header for QR data such as "VP1-".
 * @param {object} [options.jsonldDocument] - Document to encode.
 * @param {object} [options.cborldBytes] - CBOR-LD bytes to encode.
 * @param {object} [options.documentLoader] - Loader for jsonldDocument.
 * @param {object} [options.appContextMap] - CBOR-LD app context map.
 * @param {object} [options.size] - Output image module size.
 * @param {object} [options.diagnose] - Diagnostic function.
 * @param {string} [options.qrMultibaseEncoding='R'] - Multibase encoding for
 *   QR data. 'R' for base45, 'B' for base32.
 * @param {string} [options.qrErrorCorrectionLevel='L'] - QR error correction
 *   level. 'L' Low 7%, 'M' Medium 15%, 'Q' Qartile 25%, 'H' High 30%.
 * @param {string} [options.qrVersion=0] - QR version. 1-40 or 0 for auto.
 *
 * @returns {object} The QR code properties.
 */
export async function toQrCode({
  header, jsonldDocument, cborldBytes, documentLoader, appContextMap, size,
  qrMultibaseEncoding = BASE_45_MULTIBASE_PREFIX, qrErrorCorrectionLevel = 'L',
  qrVersion = 0, diagnose
} = {}) {
  if(jsonldDocument && cborldBytes) {
    throw new Error(
      'Only one of "jsonldDocument" and "cborldBytes" is allowed.');
  }

  if(!cborldBytes) {
    cborldBytes = await cborld.encode({
      jsonldDocument,
      documentLoader,
      appContextMap,
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
    header, bytes: cborldBytes, size, qrMultibaseEncoding,
    qrErrorCorrectionLevel, qrVersion
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
  expectedHeader = '', text, decodeCborld = true, documentLoader,
  appContextMap, diagnose
} = {}) {
  if(!(text && text.startsWith(expectedHeader))) {
    throw TypeError('Unsupported QR format.');
  }

  const multibasePayload = text.slice(expectedHeader.length);

  let cborldArrayBuffer;

  if(multibasePayload.startsWith(BASE_45_MULTIBASE_PREFIX)) {
    // base45 RFC9285 encoded
    cborldArrayBuffer = base45Decode(multibasePayload.slice(1));
  } else if(multibasePayload.startsWith(BASE_32_UPPERCASE_MULTIBASE_PREFIX)) {
    // base32 RFC4648 encoded
    cborldArrayBuffer = base32Decode(multibasePayload.slice(1), 'RFC4648');
  } else {
    throw TypeError('Payload multibase type not supported.');
  }

  const cborldBytes = new Uint8Array(cborldArrayBuffer);
  if(!decodeCborld) {
    return {cborldBytes};
  }

  const jsonldDocument = await cborld.decode({
    cborldBytes,
    documentLoader,
    appContextMap,
    // to debug, set diagnose: console.log
    diagnose
  });
  return {jsonldDocument};
}

function _bytesToQrCodeDataUrl({
  header = '', bytes, size, qrMultibaseEncoding, qrErrorCorrectionLevel,
  qrVersion
}) {
  let encoded;
  let vpPayload;
  if(qrMultibaseEncoding === BASE_45_MULTIBASE_PREFIX) {
    encoded = base45Encode(bytes);
    vpPayload = `${header}${BASE_45_MULTIBASE_PREFIX}${encoded}`;
  } else if(qrMultibaseEncoding === BASE_32_UPPERCASE_MULTIBASE_PREFIX) {
    encoded = base32Encode(bytes, 'RFC4648', {padding: false});
    vpPayload = `${header}${BASE_32_UPPERCASE_MULTIBASE_PREFIX}${encoded}`;
  }

  const qrcode = new Encoder();
  qrcode.setEncodingHint(true);
  qrcode.setErrorCorrectionLevel(ErrorCorrectionLevel[qrErrorCorrectionLevel]);
  qrcode.setVersion(qrVersion);
  qrcode.write(new QRAlphanumeric(vpPayload));
  qrcode.make();

  return {
    payload: vpPayload,
    encodedCborld: encoded,
    version: qrcode.getVersion(),
    imageDataUrl: qrcode.toDataURL(size)
  };
}
