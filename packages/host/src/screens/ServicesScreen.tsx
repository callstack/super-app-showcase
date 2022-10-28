import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {TabsParamList} from '../navigation/TabsNavigator';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainNavigator';

type ServiceScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabsParamList, 'Services'>,
  NativeStackScreenProps<MainStackParamList>
>;

const ServicesScreen = ({navigation}: ServiceScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Services</Text>
      <View style={styles.contentContainer}>
        <Button
          title="Booking"
          onPress={() => navigation.navigate('Booking')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    padding: 16,
    fontSize: 24,
  },
});

export default ServicesScreen;
