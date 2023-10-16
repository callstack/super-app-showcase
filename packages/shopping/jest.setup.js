jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('@callstack/repack/client', () => ({
  Federated: {
    importModule: jest.fn((container, module) => {
      if (container === 'auth') {
        switch (module) {
          case './AuthProvider':
            return Promise.resolve(require('../auth/src/screens/SignInScreen'));
          case './SignInScreen':
            return Promise.resolve(require('../auth/src/screens/SignInScreen'));
          case './AccountScreen':
            return Promise.resolve(
              require('../auth/src/screens/AccountScreen'),
            );
          default:
            throw new Error(
              `jest.setup.js: unknown module: ${module} from container: ${container}`,
            );
        }
      }
    }),
  },
}));

jest.useFakeTimers();
