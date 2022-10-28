import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookingScreen from '../screens/BookingScreen';
import TabsNavigator from './TabsNavigator';

export type MainStackParamList = {
  Tabs: undefined;
  Booking: undefined;
};

const Main = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Main.Navigator>
      <Main.Screen
        name="Tabs"
        options={{
          headerShown: false,
        }}
        component={TabsNavigator}
      />
      <Main.Screen
        options={{
          title: '',
        }}
        name="Booking"
        component={BookingScreen}
      />
    </Main.Navigator>
  );
};

export default MainNavigator;
