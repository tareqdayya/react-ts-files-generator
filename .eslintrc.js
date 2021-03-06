module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'standard',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'require-jsdoc': 'off',
    'jsdoc/require-returns': 'off',
    'jsdoc/require-description': 'off',
    'jsdoc/require-jsdoc': 'off',
    quotes: ['error', 'single'],
    strict: 'off',
    'valid-jsdoc': 'off',
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],
    semi: ['error', 'always'],
    'prefer-template': 'error',
    curly: ['error', 'multi-line'],
  },
};
