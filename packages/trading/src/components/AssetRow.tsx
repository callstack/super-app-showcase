import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useAssetPrice, useFlashAnimation, formatPrice, getAssetIconUri, colors, type Asset} from 'super-app-showcase-sdk';

interface AssetRowProps {
  asset: Asset;
  onPress: (asset: Asset) => void;
}

const AssetRow = ({asset, onPress}: AssetRowProps) => {
  const price = useAssetPrice(asset.symbol);
  const animatedStyle = useFlashAnimation(price);

  return (
    <Pressable onPress={() => onPress(asset)}>
      <Animated.View style={[styles.row, animatedStyle]}>
        <Image
          source={{uri: getAssetIconUri(asset.symbol)}}
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