import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {getAssetIconUri, colors, type Asset} from 'super-app-showcase-sdk';
import PriceCell from './PriceCell';

interface AssetRowProps {
  asset: Asset;
  onPress: (asset: Asset) => void;
}

const AssetRow = ({asset, onPress}: AssetRowProps) => {
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
    <Pressable onPress={() => onPress(asset)}>
      <Animated.View style={[styles.row, rowStyle]}>
        <Image
          source={{uri: getAssetIconUri(asset.symbol)}}
          style={styles.icon}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{asset.name}</Text>
          <Text style={styles.symbol}>{asset.symbol}</Text>
        </View>
        <PriceCell
          symbol={asset.symbol}
          flashProgress={flashProgress}
          flashIsUp={flashIsUp}
        />
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
});

export default React.memo(AssetRow);