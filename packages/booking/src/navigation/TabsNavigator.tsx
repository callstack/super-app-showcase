import React from 'react';
import {createNativeBottomTabNavigator} from '@bottom-tabs/react-navigation';
import {MD3Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeNavigator from './HomeNavigator';
import CalendarNavigator from './CalendarNavigator';
import AccountNavigator from './AccountNavigator';

export type TabsParamList = {
  HomeNavigator: undefined;
  CalendarNavigator: undefined;
  AccountNavigator: undefined;
};

const homeIcon = Icon.getImageSourceSync('home', 24);
const calendarIcon = Icon.getImageSourceSync('calendar', 24);
const accountIcon = Icon.getImageSourceSync('account', 24);

const Tabs = createNativeBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  return (
    <Tabs.Navigator tabBarActiveTintColor={MD3Colors.primary50}>
      <Tabs.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          title: 'Home',
          tabBarIcon: () => homeIcon,
        }}
      />
      <Tabs.Screen
        name="CalendarNavigator"
        component={CalendarNavigator}
        options={{
          title: 'Calendar',
          tabBarIcon: () => calendarIcon,
        }}
      />
      <Tabs.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          title: 'Account',
          tabBarIcon: () => accountIcon,
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
