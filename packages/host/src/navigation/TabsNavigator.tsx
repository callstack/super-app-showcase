import React from 'react';
import {Platform} from 'react-native';
import {createNativeBottomTabNavigator} from '@bottom-tabs/react-navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Placeholder from '../components/Placeholder';
import ErrorBoundary from '../components/ErrorBoundary';
import {colors} from '../theme';

// `sfSymbol` only renders on iOS, so Android needs a rasterized ImageSource instead.
const tabIcon =
  (sfSymbol: string, materialIconName: string) =>
  ({focused}: {focused: boolean}) =>
    Platform.OS === 'ios'
      ? {sfSymbol}
      : Icon.getImageSourceSync(
          materialIconName,
          24,
          focused ? colors.primary : colors.secondary,
        );

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
      tabBarStyle={{backgroundColor: colors.surface}}
      tabBarActiveTintColor={colors.primary}
      tabBarInactiveTintColor={colors.secondary}>
      <Tabs.Screen
        name="Trading"
        component={TradingScreen}
        options={{
          title: 'Trading',
          tabBarIcon: tabIcon('chart.line.uptrend.xyaxis', 'chart-line'),
        }}
      />
      <Tabs.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          title: 'Wallet',
          tabBarIcon: tabIcon('creditcard', 'credit-card'),
        }}
      />
      <Tabs.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'Account',
          tabBarIcon: tabIcon('person.crop.circle', 'account-circle'),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;