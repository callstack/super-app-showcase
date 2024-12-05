import React from 'react';
import {createNativeBottomTabNavigator} from '@bottom-tabs/react-navigation';
import HomeNavigator from './HomeNavigator';
import ServicesNavigator from './ServicesNavigator';
import AccountNavigator from './AccountNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type TabsParamList = {
  HomeNavigator: undefined;
  ServicesNavigator: undefined;
  AccountNavigator: undefined;
};

const homeIcon = Icon.getImageSourceSync('home', 24);
const exploreIcon = Icon.getImageSourceSync('compass', 24);
const person = Icon.getImageSourceSync('account', 24);

const Tabs = createNativeBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  return (
    <Tabs.Navigator
      tabBarActiveTintColor="#6D50AA"
    >
      <Tabs.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          title: 'Home',
          tabBarIcon: () => homeIcon,
        }}
      />
      <Tabs.Screen
        name="ServicesNavigator"
        component={ServicesNavigator}
        options={{
          title: 'Services',
          tabBarIcon: () => exploreIcon,
        }}
      />
      <Tabs.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          title: 'Account',
          tabBarIcon: () => person,
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
