module.exports = {
  root: true,
  extends: [
    'eslint-config-digitalbazaar',
    'eslint-config-digitalbazaar/jsdoc'
  ],
  env: {
    node: true
  },
  ignorePatterns: ['dist/'],
  rules: {
    'jsdoc/require-description-complete-sentence': 'off'
  }
};
