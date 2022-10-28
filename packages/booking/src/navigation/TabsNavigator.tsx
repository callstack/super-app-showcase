import React from 'react';
import {
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import AccountScreen from '../screens/AccountScreen';
import {Appbar} from 'react-native-paper';

export type TabsParamList = {
  Home: undefined;
  Search: undefined;
  Account: undefined;
};

const NavBar = ({route: {name}}: BottomTabHeaderProps) => {
  return (
    <Appbar.Header>
      <Appbar.Content title={name} />
    </Appbar.Header>
  );
};

const Tabs = createBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        header: props => <NavBar {...props} />,
      }}>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Search" component={SearchScreen} />
      <Tabs.Screen name="Account" component={AccountScreen} />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
