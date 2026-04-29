import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useConnectionStatus} from '../hooks/useConnectionStatus';
import {useAssetPrice} from '../hooks/usePrices';
import {colors} from '../theme';

const ConnectionBanner = () => {
  const status = useConnectionStatus();
  const btcPrice = useAssetPrice('BTC');

  if (btcPrice > 0) {
    return null;
  }

  const label =
    status === 'reconnecting'
      ? 'Reconnecting to market…'
      : 'Connecting to market…';

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