import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {getAssetIconUri, colors, type Asset} from 'super-app-showcase-sdk';
import type {Holding} from '../constants';
import ValueCell from './ValueCell';

interface Props {
  holding: Holding;
  asset: Asset;
}

const HoldingRow = ({holding, asset}: Props) => {
  const flashProgress = useSharedValue(0);
  const flashIsUp = useSharedValue(true);

  const rowStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      flashProgress.value,
      [0, 1],
      [colors.transparent, flashIsUp.value ? colors.priceUp : colors.priceDown],
    ),
  }));

  return (
    <Animated.View style={[styles.row, rowStyle]}>
      <Image
        source={{uri: getAssetIconUri(holding.symbol)}}
        style={styles.icon}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{asset.name}</Text>
        <Text style={styles.quantity}>
          {holding.quantity} {holding.symbol}
        </Text>
      </View>
      <ValueCell
        symbol={holding.symbol}
        quantity={holding.quantity}
        flashProgress={flashProgress}
        flashIsUp={flashIsUp}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: colors.surface,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceVariant,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    gap: 3,
  },
  name: {
    color: colors.onSurface,
    fontSize: 16,
    fontWeight: '600',
  },
  quantity: {
    color: colors.secondary,
    fontSize: 13,
  },
});

export default React.memo(HoldingRow);