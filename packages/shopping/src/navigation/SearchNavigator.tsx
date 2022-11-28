import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from '../components/NavBar';
import SearchScreen from '../screens/SearchScreen';

export type SearchStackParamList = {
  Search: undefined;
};

const Search = createNativeStackNavigator<SearchStackParamList>();

const SearchNavigator = () => {
  return (
    <Search.Navigator
      screenOptions={{
        header: props => <NavBar {...props} />,
      }}>
      <Search.Screen name="Search" component={SearchScreen} />
    </Search.Navigator>
  );
};

export default SearchNavigator;
