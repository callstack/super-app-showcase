import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import AccountNavigator from './AccountNavigator';
import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNavigator';

export type TabsParamList = {
  HomeNavigator: undefined;
  SearchNavigator: undefined;
  AccountNavigator: undefined;
};

const Tabs = createMaterialBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarIcon: 'home',
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="SearchNavigator"
        component={SearchNavigator}
        options={{
          tabBarIcon: 'magnify',
          tabBarLabel: 'Search',
        }}
      />
      <Tabs.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          tabBarIcon: 'account',
          tabBarLabel: 'Account',
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
