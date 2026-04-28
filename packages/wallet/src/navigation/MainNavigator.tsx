import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WalletScreen from '../screens/WalletScreen';
import {colors} from '../theme';

export type WalletStackParamList = {
  Wallet: undefined;
};

const Stack = createNativeStackNavigator<WalletStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.background},
        headerTintColor: colors.onBackground,
        contentStyle: {backgroundColor: colors.background},
      }}>
      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
        options={{title: 'My Wallet'}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;