import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  withSequence,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import {
  useAssetPrice,
  formatPrice,
  formatValue,
  colors,
  type AssetSymbol,
} from 'super-app-showcase-sdk';

interface ValueCellProps {
  symbol: AssetSymbol;
  quantity: number;
  flashProgress: SharedValue<number>;
  flashIsUp: SharedValue<boolean>;
}

const ValueCell = React.memo(
  ({symbol, quantity, flashProgress, flashIsUp}: ValueCellProps) => {
    const price = useAssetPrice(symbol);
    const value = price * quantity;
    const prevRef = React.useRef(0);

    React.useEffect(() => {
      if (prevRef.current !== 0 && value !== prevRef.current) {
        flashIsUp.value = value > prevRef.current;
        flashProgress.value = withSequence(
          withTiming(1, {duration: 150}),
          withTiming(0, {duration: 600}),
        );
      }
      prevRef.current = value;
    }, [value, flashProgress, flashIsUp]);

    return (
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{formatValue(value)}</Text>
        <Text style={styles.price}>{formatPrice(price)}</Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
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

export default ValueCell;
