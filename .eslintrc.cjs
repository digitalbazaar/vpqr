module.exports = {
  root: true,
  extends: [
    'digitalbazaar',
    'digitalbazaar/jsdoc',
    'digitalbazaar/module'
  ],
  env: {
    node: true
  },
  ignorePatterns: ['dist/'],
  rules: {
    'jsdoc/require-description-complete-sentence': 'off'
  }
};
