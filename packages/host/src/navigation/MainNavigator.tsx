import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookingScreen from '../screens/BookingScreen';
import TabsNavigator from './TabsNavigator';
import NavBar from '../components/NavBar';
import NewsScreen from '../screens/NewsScreen';

export type MainStackParamList = {
  Tabs: undefined;
  Booking: undefined;
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
          title: '',
        }}
      />
      <Main.Screen
        name="News"
        component={NewsScreen}
        options={{
          title: '',
        }}
      />
    </Main.Navigator>
  );
};

export default MainNavigator;
