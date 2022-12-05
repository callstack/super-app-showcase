import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from '../components/NavBar';
import CalendarScreen from '../screens/CalendarScreen';

export type CalendarStackParamList = {
  Calendar: undefined;
};

const Calendar = createNativeStackNavigator<CalendarStackParamList>();

const CalendarNavigator = () => {
  return (
    <Calendar.Navigator
      screenOptions={{
        header: props => <NavBar {...props} />,
      }}>
      <Calendar.Screen name="Calendar" component={CalendarScreen} />
    </Calendar.Navigator>
  );
};

export default CalendarNavigator;
