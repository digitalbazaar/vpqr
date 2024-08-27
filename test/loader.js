/*!
 * Copyright (c) 2021-2024 Digital Bazaar, Inc. All rights reserved.
 */
import {contexts as ageContexts} from '@digitalbazaar/age-verification-context';
import {contexts as didContexts} from 'did-context';
import {contexts as ed25519Contexts} from 'ed25519-signature-2020-context';
import {contexts as vcContexts} from 'credentials-context';
import {contexts as x25519Contexts} from 'x25519-key-agreement-2020-context';

import citContext from 'cit-context';
const {contexts: citContexts} = citContext;

import {CachedResolver} from '@digitalbazaar/did-io';
import {driver} from '@digitalbazaar/did-method-key';
import {Ed25519VerificationKey2020} from
  '@digitalbazaar/ed25519-verification-key-2020';
import {JsonLdDocumentLoader} from 'jsonld-document-loader';

const staticLoader = new JsonLdDocumentLoader();

staticLoader.addDocuments({documents: [
  ...ageContexts,
  ...citContexts,
  ...didContexts,
  ...ed25519Contexts,
  ...vcContexts,
  ...x25519Contexts
]});

const resolver = new CachedResolver();
const didKeyDriver = driver();
didKeyDriver.use({
  multibaseMultikeyHeader: 'z6Mk',
  fromMultibase: Ed25519VerificationKey2020.from
});
resolver.use(didKeyDriver);
staticLoader.setDidResolver(resolver);

export const documentLoader = staticLoader.documentLoader.bind(staticLoader);
