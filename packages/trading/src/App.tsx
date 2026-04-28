import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainNavigator from './navigation/MainNavigator';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer independent={true}>
        <MainNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;