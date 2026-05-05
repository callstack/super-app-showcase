import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AssetListScreen from '../screens/AssetListScreen';
import AssetDetailsScreen from '../screens/AssetDetailsScreen';
import TradeSuccessScreen from '../screens/TradeSuccessScreen';
import {colors, type Asset} from 'super-app-showcase-sdk';

export type TradingStackParamList = {
  AssetList: undefined;
  AssetDetails: {asset: Asset};
  TradeSuccess: {symbol: string};
};

const Stack = createNativeStackNavigator<TradingStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.background},
        headerTintColor: colors.onBackground,
        headerTitleStyle: {color: colors.onBackground},
        contentStyle: {backgroundColor: colors.background},
      }}>
      <Stack.Screen
        name="AssetList"
        component={AssetListScreen}
        options={{title: 'Markets'}}
      />
      <Stack.Screen
        name="AssetDetails"
        component={AssetDetailsScreen}
        options={({route}) => ({title: route.params.asset.name})}
      />
      <Stack.Screen
        name="TradeSuccess"
        component={TradeSuccessScreen}
        options={{headerShown: false, presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;