/*!
 * Copyright (c) 2021-2025 Digital Bazaar, Inc. All rights reserved.
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
 * @param {string} [options.format='cbor-ld-1.0'] - The CBOR-LD output format
 *   to use; this will default to `cbor-ld-1.0` to use CBOR-LD 1.0 tag
 *   `0xcb1d` (51997); to create output with a pre-1.0 CBOR-LD tag, then
 *   'legacy-range' can be passed to use tags `0x0600-0x06ff` (1526-1791) and
 *   'legacy-singleton' can be passed to use tags `0x0500-0x0501`.
 * @param {object} [options.documentLoader] - Loader for jsonldDocument.
 * @param {number} [options.registryEntryId] - CBOR-LD type table registry
 *   entry ID.
 * @param {Function} [options.typeTableLoader] - CBOR-LD type table loader
 *   for a `registryEntryId` option.
 * @param {object} [options.moduleSize] - Output image QR Code module size.
 * @param {object} [options.margin] - Output image margin size.
 * @param {string} [options.qrMultibaseEncoding='R'] - Multibase encoding for
 *   QR data. 'R' for base45, 'B' for base32.
 * @param {string} [options.qrErrorCorrectionLevel='L'] - QR error correction
 *   level. 'L' Low 7%, 'M' Medium 15%, 'Q' Qartile 25%, 'H' High 30%.
 * @param {string} [options.qrVersion=0] - QR version. 1-40 or 0 for auto.
 * @param {object} [options.diagnose] - Diagnostic function.
 * @param {object} [options.appContextMap] - Only for use with legacy mode;
 *   CBOR-LD app context map.
 * @param {*} [options.typeTable] - Do NOT use; disallowed.
 *
 * @returns {object} The QR code properties.
 */
export async function toQrCode({
  header, jsonldDocument, cborldBytes, format = 'cbor-ld-1.0',
  documentLoader, registryEntryId, typeTableLoader, moduleSize, margin,
  qrMultibaseEncoding = BASE_45_MULTIBASE_PREFIX,
  qrErrorCorrectionLevel = 'L',
  qrVersion = 0,
  diagnose, appContextMap, typeTable
} = {}) {
  if(jsonldDocument && cborldBytes) {
    throw new Error(
      'Only one of "jsonldDocument" and "cborldBytes" is allowed.');
  }

  if(!cborldBytes) {
    cborldBytes = await cborld.encode({
      jsonldDocument,
      documentLoader,
      format,
      registryEntryId,
      typeTableLoader,
      // to debug, set diagnose: console.log
      diagnose,
      // legacy
      appContextMap,
      // disallowed old param, let cborld handle it
      typeTable
    });
  }

  const {
    payload,
    imageDataUrl,
    encodedCborld,
    version
  } = _bytesToQrCodeDataUrl({
    header, bytes: cborldBytes, moduleSize, margin, qrMultibaseEncoding,
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

/**
 * Decode from scanned QR code text.
 *
 * @param {object} options - Encoding options.
 * @param {object} options.expectedHeader - Expected header for QR text such as
 *   "VP1-".
 * @param {object} [options.text] - Scanend QR code text to decode.
 * @param {object} [options.decodeCborld=true] - Flag to decode CBOR-LD.
 * @param {object} [options.documentLoader] - Loader for jsonldDocument.
 * @param {Function} [options.typeTableLoader] - CBOR-LD type table loader
 *   for the used `registryEntryId`.
 * @param {object} [options.diagnose] - Diagnostic function.
 * @param {object} [options.appContextMap] - Only for use with legacy mode;
 *   CBOR-LD app context map.
 * @param {*} [options.typeTable] - Do NOT use; disallowed.
 *
 * @returns {object} The decoded JSON-LD document.
 */
export async function fromQrCode({
  expectedHeader = '', text, decodeCborld = true, documentLoader,
  typeTableLoader, diagnose, appContextMap, typeTable
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
    typeTableLoader,
    // to debug, set diagnose: console.log
    diagnose,
    // legacy
    appContextMap,
    // disallowed old param, let cborld handle it
    typeTable
  });
  return {jsonldDocument};
}

function _bytesToQrCodeDataUrl({
  header = '', bytes, moduleSize, margin, qrMultibaseEncoding,
  qrErrorCorrectionLevel,
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
    imageDataUrl: qrcode.toDataURL(moduleSize, margin)
  };
}
