import * as didKey from '@digitalbazaar/did-method-key';
import {CachedResolver} from '@digitalbazaar/did-io';
import citContext from 'cit-context';
import didContext from 'did-context';
import ed25519 from 'ed25519-signature-2020-context';
import x25519 from 'x25519-key-agreement-2020-context';
import cred from 'credentials-context';
import ageContext from 'age-verification-context';
import {JsonLdDocumentLoader} from 'jsonld-document-loader';

const didKeyDriver = didKey.driver();
const resolver = new CachedResolver();
resolver.use(didKeyDriver);

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

staticLoader.setDidResolver(resolver);

export const documentLoader = staticLoader.documentLoader.bind(staticLoader);

