import * as didKey from '@digitalbazaar/did-method-key';
import citContext from 'cit-context';
import didContext from 'did-context';
import ed25519 from 'ed25519-signature-2020-context';
import x25519 from 'x25519-key-agreement-2020-context';
import cred from 'credentials-context';
import ageContext from '@convenience-org/age-verification-context';
import {JsonLdDocumentLoader} from 'jsonld-document-loader';

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

const didKeyDriver = didKey.driver();

export const documentLoader = async url => {
  if(url && url.startsWith('did:key')) {
    const document = await didKeyDriver.get({url});
    return {
      contextUrl: null,
      document,
      documentUrl: url,
      tag: 'static'
    };
  }

  return staticLoader.documentLoader(url);
};

