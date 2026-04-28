import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useAssetPrice, ASSETS} from 'super-app-showcase-sdk';
import type {Holding} from '../constants';
import {colors} from '../theme';

const ICON_BASE_URL = 'https://assets.coincap.io/assets/icons';

const formatCurrency = (value: number): string =>
  value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  });

interface Props {
  holding: Holding;
}

const HoldingRow = ({holding}: Props) => {
  const price = useAssetPrice(holding.symbol);
  const value = price * holding.quantity;
  const prevValueRef = React.useRef(0);
  const isUp = useSharedValue(true);
  const flashProgress = useSharedValue(0);

  const asset = ASSETS.find(a => a.symbol === holding.symbol);

  React.useEffect(() => {
    if (prevValueRef.current !== 0 && value !== prevValueRef.current) {
      isUp.value = value > prevValueRef.current;
      flashProgress.value = withSequence(
        withTiming(1, {duration: 150}),
        withTiming(0, {duration: 600}),
      );
    }
    prevValueRef.current = value;
  }, [value, flashProgress, isUp]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      flashProgress.value,
      [0, 1],
      [colors.transparent, isUp.value ? colors.priceUp : colors.priceDown],
    ),
  }));

  return (
    <Animated.View style={[styles.row, animatedStyle]}>
      <Image
        source={{uri: `${ICON_BASE_URL}/${holding.symbol.toLowerCase()}@2x.png`}}
        style={styles.icon}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{asset?.name ?? holding.symbol}</Text>
        <Text style={styles.quantity}>
          {holding.quantity} {holding.symbol}
        </Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value > 0 ? formatCurrency(value) : '—'}</Text>
        <Text style={styles.price}>
          {price > 0
            ? price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 2,
              })
            : '—'}
        </Text>
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