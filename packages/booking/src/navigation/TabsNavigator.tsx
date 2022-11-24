import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeNavigator from './HomeNavigator';
import CalendarNavigator from './CalendarNavigator';
import AccountNavigator from './AccountNavigator';

export type TabsParamList = {
  HomeNavigator: undefined;
  CalendarNavigator: undefined;
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
          title: 'Home',
          tabBarIcon: 'home',
        }}
      />
      <Tabs.Screen
        name="CalendarNavigator"
        component={CalendarNavigator}
        options={{
          title: 'Calendar',
          tabBarIcon: 'calendar',
        }}
      />
      <Tabs.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          title: 'Account',
          tabBarIcon: 'account',
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
