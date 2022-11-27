import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from '../components/NavBar';
import AccountScreen from '../screens/AccountScreen';

export type AccountStackParamList = {
  Account: undefined;
};

const Account = createNativeStackNavigator<AccountStackParamList>();

const AccountNavigator = () => {
  return (
    <Account.Navigator
      screenOptions={{
        header: props => <NavBar {...props} />,
      }}>
      <Account.Screen name="Account" component={AccountScreen} />
    </Account.Navigator>
  );
};

export default AccountNavigator;
