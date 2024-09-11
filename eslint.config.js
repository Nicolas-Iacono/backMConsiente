/** @type {import('eslint').Linter.FlatConfig} */
module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      node: require('eslint-plugin-node'),
    },
    rules: {
      'no-unused-vars': 'warn',
      'node/no-unsupported-features/es-syntax': 'off', // Desactiva temporalmente esta regla
    },
  },
];
