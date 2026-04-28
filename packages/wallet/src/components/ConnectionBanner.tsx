import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useConnectionStatus, useAssetPrice} from 'super-app-showcase-sdk';
import {colors} from '../theme';

const ConnectionBanner = () => {
  const status = useConnectionStatus();
  const btcPrice = useAssetPrice('BTC');
  const hasData = btcPrice > 0;

  if (hasData) {
    return null;
  }

  const label =
    status === 'reconnecting' ? 'Reconnecting to market…' : 'Connecting to market…';

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.surfaceVariant,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  text: {
    color: colors.secondary,
    fontSize: 12,
  },
});

export default ConnectionBanner;