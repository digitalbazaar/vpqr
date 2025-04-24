/*!
 * Copyright (c) 2021-2025 Digital Bazaar, Inc. All rights reserved.
 */
import * as util from './util.js';

const VP_QR_VERSION = 'VP1';
const HEADER = VP_QR_VERSION + '-';

export async function toQrCode({
  vp, format, documentLoader, registryEntryId, typeTableLoader,
  moduleSize, margin, qrMultibaseEncoding,
  qrErrorCorrectionLevel, qrVersion, diagnose, appContextMap, typeTable
} = {}) {
  return util.toQrCode({
    header: HEADER, jsonldDocument: vp, format, documentLoader,
    registryEntryId, typeTableLoader, qrMultibaseEncoding,
    qrErrorCorrectionLevel, qrVersion, moduleSize, margin, diagnose,
    appContextMap, typeTable
  });
}

export async function fromQrCode({
  text, documentLoader, typeTableLoader, diagnose, appContextMap, typeTable
} = {}) {
  const expectedHeader = HEADER;
  if(!(text && text.startsWith(expectedHeader))) {
    throw TypeError('Unsupported VP QR format.');
  }
  const {jsonldDocument} = await util.fromQrCode({
    expectedHeader, text, documentLoader, typeTableLoader,
    diagnose, appContextMap, typeTable
  });
  return {vp: jsonldDocument};
}
