import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {TabsParamList} from '../navigation/TabsNavigator';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainNavigator';

type ServiceScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabsParamList, 'ServicesNavigator'>,
  NativeStackScreenProps<MainStackParamList>
>;

const ServicesScreen = ({navigation}: ServiceScreenProps) => {
  return (
    <View style={styles.container}>
      <Button title="Booking" onPress={() => navigation.navigate('Booking')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ServicesScreen;
