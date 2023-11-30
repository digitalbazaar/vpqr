/*!
 * Copyright (c) 2021-2023 Digital Bazaar, Inc. All rights reserved.
 */
import ageContext from 'age-verification-context';
import {CachedResolver} from '@digitalbazaar/did-io';
import citContext from 'cit-context';
import cred from 'credentials-context';
import didContext from 'did-context';
import {driver} from '@digitalbazaar/did-method-key';
import ed25519 from 'ed25519-signature-2020-context';
import {Ed25519VerificationKey2020} from
  '@digitalbazaar/ed25519-verification-key-2020';
import {JsonLdDocumentLoader} from 'jsonld-document-loader';
import x25519 from 'x25519-key-agreement-2020-context';

const {contexts: credentialsContext, constants: {CREDENTIALS_CONTEXT_V1_URL}} =
  cred;

const staticLoader = new JsonLdDocumentLoader();
staticLoader.addStatic(ed25519.constants.CONTEXT_URL,
  ed25519.contexts.get(ed25519.constants.CONTEXT_URL));

staticLoader.addStatic(x25519.constants.CONTEXT_URL,
  x25519.contexts.get(x25519.constants.CONTEXT_URL));

staticLoader.addStatic(citContext.constants.CONTEXT_URL,
  citContext.contexts.get(citContext.constants.CONTEXT_URL));

staticLoader.addStatic(ageContext.CONTEXT_URL_V1, ageContext.CONTEXT_V1);

staticLoader.addStatic(didContext.constants.DID_CONTEXT_URL,
  didContext.contexts.get(didContext.constants.DID_CONTEXT_URL));

staticLoader.addStatic(CREDENTIALS_CONTEXT_V1_URL,
  credentialsContext.get(CREDENTIALS_CONTEXT_V1_URL));

const resolver = new CachedResolver();
const didKeyDriver = driver();
didKeyDriver.use({
  multibaseMultikeyHeader: 'z6Mk',
  fromMultibase: Ed25519VerificationKey2020.from
});
resolver.use(didKeyDriver);
staticLoader.setDidResolver(resolver);

export const documentLoader = staticLoader.documentLoader.bind(staticLoader);
