import 'react-native-gesture-handler/jestSetup';

jest.mock('@bottom-tabs/react-navigation', () => {
  const React = require('react');
  const {View} = require('react-native');
  const createNativeBottomTabNavigator = () => ({
    Navigator: ({children}) => React.createElement(View, null, children),
    Screen: ({component: Component}) => React.createElement(Component),
  });
  return {createNativeBottomTabNavigator};
});

jest.mock('react-native-bootsplash', () => {
  return {
    hide: jest.fn().mockResolvedValue(),
    isVisible: jest.fn().mockResolvedValue(false),
    useHideAnimation: jest.fn().mockReturnValue({
      container: {},
      logo: {source: 0},
      brand: {source: 0},
    }),
  };
});

jest.mock('@callstack/repack/client', () => ({
  Federated: {
    importModule: jest.fn((container, module) => {
      if (container === 'auth') {
        const authMock = require('../auth/mocks/federated');
        return Promise.resolve(authMock.default(module));
      }
      if (container === 'trading') {
        switch (module) {
          case './App':
            return Promise.resolve({default: () => null});
          default:
            throw new Error(`TradingMock: unknown module: ${module}`);
        }
      }
      if (container === 'wallet') {
        switch (module) {
          case './App':
            return Promise.resolve({default: () => null});
          default:
            throw new Error(`WalletMock: unknown module: ${module}`);
        }
      }
      throw new Error('jest.setup.js: unknown container: ' + container);
    }),
  },
}));