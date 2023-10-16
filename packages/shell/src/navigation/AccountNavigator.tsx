import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from '../components/NavBar';
import AccountScreen from '../screens/AccountScreen';

export type AccountStackParamList = {
  Account: undefined;
};

const Home = createNativeStackNavigator<AccountStackParamList>();

const AccountNavigator = () => {
  return (
    <Home.Navigator
      screenOptions={{
        header: NavBar,
      }}>
      <Home.Screen name="Account" component={AccountScreen} />
    </Home.Navigator>
  );
};

export default AccountNavigator;
