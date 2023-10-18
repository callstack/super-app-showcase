module.exports = {
  preset: 'react-native',
  fakeTimers: {
    enableGlobally: true,
  },
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(?:.pnpm/)?((jest-)?react-native|@react-native(-community)?|react-navigation|@react-navigation|react-native-svg))',
  ],
};
