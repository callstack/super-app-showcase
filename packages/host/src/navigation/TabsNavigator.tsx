import React from 'react';
import {createNativeBottomTabNavigator} from '@bottom-tabs/react-navigation';
import HomeNavigator from './HomeNavigator';
import ServicesNavigator from './ServicesNavigator';
import AccountNavigator from './AccountNavigator';

export type TabsParamList = {
  HomeNavigator: undefined;
  ServicesNavigator: undefined;
  AccountNavigator: undefined;
};

const Tabs = createNativeBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          title: 'Home',
          tabBarIcon: () => ({sfSymbol: 'house'}),
        }}
      />
      <Tabs.Screen
        name="ServicesNavigator"
        component={ServicesNavigator}
        options={{
          title: 'Services',
          tabBarIcon: () => ({sfSymbol: 'book'}),
        }}
      />
      <Tabs.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          title: 'Account',
          tabBarIcon: () => ({sfSymbol: 'person'}),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
