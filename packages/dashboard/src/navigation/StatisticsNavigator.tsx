import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from '../components/NavBar';
import StatisticsScreen from '../screens/StatisticsScreen';

export type StatisticsStackParamList = {
  Statistics: undefined;
};

const Statistics = createNativeStackNavigator<StatisticsStackParamList>();

const StatisticsNavigator = () => {
  return (
    <Statistics.Navigator
      screenOptions={{
        header: NavBar,
      }}>
      <Statistics.Screen name="Statistics" component={StatisticsScreen} />
    </Statistics.Navigator>
  );
};

export default StatisticsNavigator;
