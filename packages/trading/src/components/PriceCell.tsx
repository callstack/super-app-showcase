import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  withSequence,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import {
  useAssetPrice,
  formatPrice,
  colors,
  type AssetSymbol,
} from 'super-app-showcase-sdk';

interface PriceCellProps {
  symbol: AssetSymbol;
  flashProgress: SharedValue<number>;
  flashIsUp: SharedValue<boolean>;
}

const PriceCell = React.memo(
  ({symbol, flashProgress, flashIsUp}: PriceCellProps) => {
    const price = useAssetPrice(symbol);
    const prevRef = React.useRef(0);

    React.useEffect(() => {
      if (prevRef.current !== 0 && price !== prevRef.current) {
        flashIsUp.value = price > prevRef.current;
        flashProgress.value = withSequence(
          withTiming(1, {duration: 150}),
          withTiming(0, {duration: 600}),
        );
      }
      prevRef.current = price;
    }, [price, flashProgress, flashIsUp]);

    return <Text style={styles.price}>{formatPrice(price)}</Text>;
  },
);

const styles = StyleSheet.create({
  price: {
    color: colors.onSurface,
    fontSize: 16,
    fontWeight: '500',
    fontVariant: ['tabular-nums'],
  },
});

export default PriceCell;
