const reactNativeConfig = require('@react-native/eslint-config/flat');
const reactNativeConfigWithoutFlow = reactNativeConfig.filter(
  config => !config.plugins?.['ft-flow'],
);

module.exports = [
  ...reactNativeConfigWithoutFlow,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-shadow': 'error',
      'no-shadow': 'off',
      'no-undef': 'off',
    },
  },
];
