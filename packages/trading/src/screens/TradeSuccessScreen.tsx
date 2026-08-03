import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {TradingStackParamList} from '../navigation/MainNavigator';
import {colors} from 'super-app-showcase-sdk';

type Props = NativeStackScreenProps<TradingStackParamList, 'TradeSuccess'>;

const TradeSuccessScreen = ({navigation, route}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.checkmark}>✓</Text>
      <Text style={styles.title}>Trade Placed!</Text>
      <Text style={styles.subtitle}>
        {route.params.symbol}/USD order confirmed
      </Text>
      <Pressable
        style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Done</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A8C4E',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 32,
  },
  checkmark: {
    fontSize: 80,
    color: colors.onPrimary,
    marginBottom: 8,
  },
  title: {
    color: colors.onPrimary,
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 16,
    marginBottom: 32,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 16,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TradeSuccessScreen;
