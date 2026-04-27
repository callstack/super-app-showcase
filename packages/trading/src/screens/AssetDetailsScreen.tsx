import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {TradingStackParamList} from '../navigation/MainNavigator';
import {colors} from '../theme';

type Props = NativeStackScreenProps<TradingStackParamList, 'AssetDetails'>;

const AssetDetailsScreen = ({route}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{route.params.asset.name} — coming in US-6</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.secondary,
    fontSize: 16,
  },
});

export default AssetDetailsScreen;