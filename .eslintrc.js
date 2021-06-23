module.exports = {
  root: true,
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    'no-inline-styles': false,
  },
  extends: [
    '@react-native-community',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array
  ],
};
