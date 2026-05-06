import React from 'react';
import {createNativeBottomTabNavigator} from '@bottom-tabs/react-navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Placeholder from '../components/Placeholder';
import ErrorBoundary from '../components/ErrorBoundary';
import {colors} from '../theme';

const randomDelay = () =>
  new Promise(resolve => setTimeout(resolve, 250 + Math.random() * 100));

const TradingApp = React.lazy(() =>
  randomDelay().then(() => import('trading/App')),
);
const WalletApp = React.lazy(() =>
  randomDelay().then(() => import('wallet/App')),
);
const AccountScreenRemote = React.lazy(() =>
  randomDelay().then(() => import('auth/AccountScreen')),
);

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

const AccountRemoteScreen = () => (
  <ErrorBoundary name="Account">
    <React.Suspense fallback={<Placeholder label="Account" icon="person" />}>
      <AccountScreenRemote />
    </React.Suspense>
  </ErrorBoundary>
);

const AccountStack = createNativeStackNavigator();

const AccountScreen = () => (
  <AccountStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: colors.background},
      headerTintColor: colors.onBackground,
      headerTitleStyle: {color: colors.onBackground},
      contentStyle: {backgroundColor: colors.background},
    }}>
    <AccountStack.Screen
      name="AccountMain"
      component={AccountRemoteScreen}
      options={{title: 'Account'}}
    />
  </AccountStack.Navigator>
);

export type TabsParamList = {
  Trading: undefined;
  Wallet: undefined;
  Account: undefined;
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
        options={{
          title: 'Trading',
          tabBarIcon: () => ({sfSymbol: 'chart.line.uptrend.xyaxis'}),
        }}
      />
      <Tabs.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          title: 'Wallet',
          tabBarIcon: () => ({sfSymbol: 'creditcard'}),
        }}
      />
      <Tabs.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'Account',
          tabBarIcon: () => ({sfSymbol: 'person.crop.circle'}),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;