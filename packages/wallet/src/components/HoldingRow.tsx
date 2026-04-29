import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useAssetPrice, formatPrice, formatValue, type Asset} from 'super-app-showcase-sdk';
import {useFlashAnimation} from '../hooks/useFlashAnimation';
import type {Holding} from '../constants';
import {colors} from '../theme';

const ICON_BASE_URL = 'https://assets.coincap.io/assets/icons';

interface Props {
  holding: Holding;
  asset: Asset;
}

const HoldingRow = ({holding, asset}: Props) => {
  const price = useAssetPrice(holding.symbol);
  const value = price * holding.quantity;
  const animatedStyle = useFlashAnimation(value);

  return (
    <Animated.View style={[styles.row, animatedStyle]}>
      <Image
        source={{
          uri: `${ICON_BASE_URL}/${holding.symbol.toLowerCase()}@2x.png`,
        }}
        style={styles.icon}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{asset.name}</Text>
        <Text style={styles.quantity}>
          {holding.quantity} {holding.symbol}
        </Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{formatValue(value)}</Text>
        <Text style={styles.price}>{formatPrice(price)}</Text>
      </View>
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
  valueContainer: {
    alignItems: 'flex-end',
    gap: 3,
  },
  value: {
    color: colors.onSurface,
    fontSize: 16,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  price: {
    color: colors.secondary,
    fontSize: 12,
    fontVariant: ['tabular-nums'],
  },
});

export default React.memo(HoldingRow);