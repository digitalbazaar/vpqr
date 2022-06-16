module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'digitalbazaar',
    'digitalbazaar/jsdoc',
    'digitalbazaar/module'
  ],
  rules: {
    'jsdoc/require-description-complete-sentence': 'off',
    'unicorn/prefer-node-protocol': 'error'
  }
};
