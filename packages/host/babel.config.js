module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'babel-plugin-react-compiler',
    'transform-inline-environment-variables',
    'react-native-worklets/plugin',
  ],
};
