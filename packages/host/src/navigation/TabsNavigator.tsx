import React from 'react';
import {createNativeBottomTabNavigator} from '@bottom-tabs/react-navigation';
import Placeholder from '../components/Placeholder';
import ErrorBoundary from '../components/ErrorBoundary';
import {colors} from '../theme';

const TradingApp = React.lazy(() => import('trading/App'));
const WalletApp = React.lazy(() => import('wallet/App'));

const TradingScreen = () => (
  <ErrorBoundary name="Trading">
    <React.Suspense fallback={<Placeholder label="Trading" icon="chart-line" />}>
      <TradingApp />
    </React.Suspense>
  </ErrorBoundary>
);

const WalletScreen = () => (
  <ErrorBoundary name="Wallet">
    <React.Suspense fallback={<Placeholder label="Wallet" icon="wallet" />}>
      <WalletApp />
    </React.Suspense>
  </ErrorBoundary>
);

export type TabsParamList = {
  Trading: undefined;
  Wallet: undefined;
};

const Tabs = createNativeBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  return (
    <Tabs.Navigator
      translucent={false}
      tabBarActiveTintColor={colors.primary}
      tabBarInactiveTintColor={colors.secondary}>
      <Tabs.Screen
        name="Trading"
        component={TradingScreen}
        options={{title: 'Trading'}}
      />
      <Tabs.Screen
        name="Wallet"
        component={WalletScreen}
        options={{title: 'Wallet'}}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;