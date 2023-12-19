/*!
 * Copyright (c) 2021-2023 Digital Bazaar, Inc. All rights reserved.
 */
import * as util from './util.js';

const VP_QR_VERSION = 'VP1';
const HEADER = VP_QR_VERSION + '-';

export async function toQrCode({
  vp, documentLoader, appContextMap, size, diagnose
} = {}) {
  return util.toQrCode({
    header: HEADER, jsonldDocument: vp, documentLoader, appContextMap, size,
    diagnose
  });
}

export async function fromQrCode({
  text, documentLoader, appContextMap, diagnose
} = {}) {
  const expectedHeader = HEADER;
  if(!(text && text.startsWith(expectedHeader))) {
    throw TypeError('Unsupported VP QR format.');
  }
  const {jsonldDocument} = await util.fromQrCode(
    {expectedHeader, text, documentLoader, appContextMap, diagnose});
  return {vp: jsonldDocument};
}
