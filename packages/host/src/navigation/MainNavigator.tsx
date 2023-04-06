import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookingScreen from '../screens/BookingScreen';
import TabsNavigator from './TabsNavigator';
import NewsScreen from '../screens/NewsScreen';
import ShoppingScreen from '../screens/ShoppingScreen';
import DashboardScreen from '../screens/DashboardScreen';

export type MainStackParamList = {
  Tabs: undefined;
  Booking: undefined;
  Shopping: undefined;
  News: undefined;
  Dashboard: undefined;
  EmailModal: undefined;
};

const Main = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Main.Screen name="Tabs" component={TabsNavigator} />
      <Main.Screen name="Booking" component={BookingScreen} />
      <Main.Screen name="Shopping" component={ShoppingScreen} />
      <Main.Screen name="News" component={NewsScreen} />
      <Main.Screen name="Dashboard" component={DashboardScreen} />
      {/* TODO: decide if we prompt modal or not */}
      {/* <Main.Group
        screenOptions={{
          presentation: 'transparentModal',
          headerShown: false,
          animation: 'fade',
        }}>
        <Main.Screen name="EmailModal" component={EmailModalScreen} />
      </Main.Group> */}
    </Main.Navigator>
  );
};

export default MainNavigator;
