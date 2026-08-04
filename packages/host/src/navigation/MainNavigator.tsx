import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabsNavigator from './TabsNavigator';
import {colors} from '../theme';

export type MainStackParamList = {
  Tabs: undefined;
};

const Main = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.background},
      }}>
      <Main.Screen name="Tabs" component={TabsNavigator} />
    </Main.Navigator>
  );
};

export default MainNavigator;
