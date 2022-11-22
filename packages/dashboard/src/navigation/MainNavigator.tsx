import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabsNavigator from './TabsNavigator';

export type MainStackParamList = {
  Tabs: undefined;
};

const Main = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Main.Screen name="Tabs" component={TabsNavigator} />
    </Main.Navigator>
  );
};

export default MainNavigator;
