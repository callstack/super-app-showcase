import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {TabsParamList} from '../navigation/TabsNavigator';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../navigation/HomeNavigator';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList>,
  BottomTabScreenProps<TabsParamList, 'HomeNavigator'>
>;

const HomeScreen = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Button
        title="Upcoming"
        onPress={() => navigation.navigate('Upcoming')}
      />
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

export default HomeScreen;
