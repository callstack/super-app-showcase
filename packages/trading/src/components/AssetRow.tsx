import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useAssetPrice, type Asset} from 'super-app-showcase-sdk';
import {colors} from '../theme';

const ICON_BASE_URL = 'https://assets.coincap.io/assets/icons';

const formatPrice = (price: number): string => {
  if (price === 0) {
    return '—';
  }
  const decimals = price >= 1 ? 2 : 6;
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: decimals,
  });
};

interface AssetRowProps {
  asset: Asset;
  onPress: (asset: Asset) => void;
}

const AssetRow = ({asset, onPress}: AssetRowProps) => {
  const price = useAssetPrice(asset.symbol);
  const prevPriceRef = React.useRef(0);
  const isUp = useSharedValue(true);
  const flashProgress = useSharedValue(0);

  React.useEffect(() => {
    if (prevPriceRef.current !== 0 && price !== prevPriceRef.current) {
      isUp.value = price > prevPriceRef.current;
      flashProgress.value = withSequence(
        withTiming(1, {duration: 150}),
        withTiming(0, {duration: 600}),
      );
    }
    prevPriceRef.current = price;
  }, [price, flashProgress, isUp]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      flashProgress.value,
      [0, 1],
      [
        colors.transparent,
        isUp.value ? colors.priceUp : colors.priceDown,
      ],
    ),
  }));

  return (
    <Pressable onPress={() => onPress(asset)}>
      <Animated.View style={[styles.row, animatedStyle]}>
        <Image
          source={{
            uri: `${ICON_BASE_URL}/${asset.symbol.toLowerCase()}@2x.png`,
          }}
          style={styles.icon}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{asset.name}</Text>
          <Text style={styles.symbol}>{asset.symbol}</Text>
        </View>
        <Text style={styles.price}>{formatPrice(price)}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceVariant,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    gap: 2,
  },
  name: {
    color: colors.onSurface,
    fontSize: 16,
    fontWeight: '600',
  },
  symbol: {
    color: colors.secondary,
    fontSize: 13,
  },
  price: {
    color: colors.onSurface,
    fontSize: 16,
    fontWeight: '500',
    fontVariant: ['tabular-nums'],
  },
});

export default React.memo(AssetRow);