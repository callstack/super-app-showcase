import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookingScreen from '../screens/BookingScreen';
import TabsNavigator from './TabsNavigator';
import NavBar from '../components/NavBar';
import NewsScreen from '../screens/NewsScreen';
import ShoppingScreen from '../screens/ShoppingScreen';

export type MainStackParamList = {
  Tabs: undefined;
  Booking: undefined;
  Shopping: undefined;
  News: undefined;
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
      <Main.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          title: 'Booking',
        }}
      />
      <Main.Screen
        name="Shopping"
        component={ShoppingScreen}
        options={{
          title: 'Shopping',
        }}
      />
      <Main.Screen
        name="News"
        component={NewsScreen}
        options={{
          title: 'News',
        }}
      />
    </Main.Navigator>
  );
};

export default MainNavigator;
