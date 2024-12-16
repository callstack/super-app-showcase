import React from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Appbar, MD3Colors} from 'react-native-paper';

const NavBar = ({navigation, back, route, options}: NativeStackHeaderProps) => {
  return (
    <Appbar.Header elevated style={{backgroundColor: MD3Colors.primary95}}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={options.title ?? route.name} />
    </Appbar.Header>
  );
};

export default NavBar;
