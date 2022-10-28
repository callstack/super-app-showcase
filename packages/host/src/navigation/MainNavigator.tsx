import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import BookingScreen from '../screens/BookingScreen';
import TabsNavigator from './TabsNavigator';
import {Appbar} from 'react-native-paper';

export type MainStackParamList = {
  Tabs: undefined;
  Booking: undefined;
};

const NavBar = ({navigation, back}: NativeStackHeaderProps) => {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="" />
    </Appbar.Header>
  );
};

const Main = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Main.Navigator
      screenOptions={{
        header: props => <NavBar {...props} />,
      }}>
      <Main.Screen
        name="Tabs"
        options={{
          headerShown: false,
        }}
        component={TabsNavigator}
      />
      <Main.Screen name="Booking" component={BookingScreen} />
    </Main.Navigator>
  );
};

export default MainNavigator;
