import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import AccountScreen from '../screens/AccountScreen';

export type TabsParamList = {
  Home: undefined;
  Search: undefined;
  Account: undefined;
};

const Tabs = createBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Search" component={SearchScreen} />
      <Tabs.Screen name="Account" component={AccountScreen} />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
