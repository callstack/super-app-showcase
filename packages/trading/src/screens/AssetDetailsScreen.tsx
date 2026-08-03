import React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useBottomTabBarHeight} from 'react-native-bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {matchFont} from '@shopify/react-native-skia';
import {CartesianChart, Line} from 'victory-native';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  useAssetPrice,
  useHistoricalPrices,
  formatPrice,
  colors,
} from 'super-app-showcase-sdk';
import type {TradingStackParamList} from '../navigation/MainNavigator';
import TradeBottomSheet from '../components/TradeBottomSheet';
import type {BottomSheetRef} from '../components/TradeBottomSheet';

// victory-native@41 still builds its line path via skia's deprecated
// SkPath.addPath(), which logs a deprecation warning on every chart render.
// The call site is inside victory-native (not our code), so silence just this
// one message until the lib migrates to Skia.PathBuilder. See:
// https://shopify.github.io/react-native-skia/docs/shapes/path-migration
type PatchableConsole = typeof console & {__skiaAddPathWarnPatched?: boolean};
if (__DEV__ && !(console as PatchableConsole).__skiaAddPathWarnPatched) {
  const originalWarn = console.warn.bind(console);
  console.warn = (...args: Parameters<typeof console.warn>) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('SkPath.addPath() is deprecated')
    ) {
      return;
    }
    originalWarn(...args);
  };
  (console as PatchableConsole).__skiaAddPathWarnPatched = true;
}

type Props = NativeStackScreenProps<TradingStackParamList, 'AssetDetails'>;

const MAX_TICKS = 60;
const IOS_TAB_BAR_FALLBACK_HEIGHT = 49;

const NEWS_ITEMS = [
  {
    id: '1',
    title: 'Federal Reserve signals potential rate cuts later this year',
    time: '2h ago',
    source: 'Reuters',
  },
  {
    id: '2',
    title:
      'Institutional adoption accelerates as major banks enter crypto market',
    time: '4h ago',
    source: 'Bloomberg',
  },
  {
    id: '3',
    title: 'On-chain metrics suggest accumulation phase for long-term holders',
    time: '6h ago',
    source: 'CoinDesk',
  },
  {
    id: '4',
    title:
      'New regulatory framework proposed to clarify digital asset classification',
    time: '8h ago',
    source: 'Financial Times',
  },
];

const AssetDetailsScreen = ({route, navigation}: Props) => {
  const {asset} = route.params;
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const effectiveTabBarHeight =
    Platform.OS === 'ios'
      ? // sometimes the first render would get 0 for tab bar height
        Math.max(tabBarHeight, IOS_TAB_BAR_FALLBACK_HEIGHT + insets.bottom)
      : 0;
  const footerPaddingBottom =
    Platform.OS === 'ios' ? effectiveTabBarHeight + 8 : 16;
  const price = useAssetPrice(asset.symbol);
  const historicalPrices = useHistoricalPrices(asset.krakenPair);
  const prevPriceRef = React.useRef(0);
  const tradeSheetRef = React.useRef<BottomSheetRef>(null);

  const [chartData, setChartData] = React.useState<
    {index: number; price: number}[]
  >([]);
  const bufferRef = React.useRef<number[]>([]);
  const seededRef = React.useRef(false);

  React.useEffect(() => {
    if (historicalPrices.length === 0 || seededRef.current) {
      return;
    }
    seededRef.current = true;
    bufferRef.current = historicalPrices;
    setChartData(historicalPrices.map((p, index) => ({index, price: p})));
  }, [historicalPrices]);

  // Shared value for line color: 0 = neutral, 1 = up, -1 = down
  const lineColorProgress = useSharedValue(0);

  const lineColor = useDerivedValue(() => {
    if (lineColorProgress.value > 0) {
      return colors.priceUpText;
    }
    if (lineColorProgress.value < 0) {
      return colors.priceDownText;
    }
    return colors.primary;
  });

  React.useEffect(() => {
    if (price === 0) {
      return;
    }

    // Update 60-tick buffer
    bufferRef.current = [...bufferRef.current, price].slice(-MAX_TICKS);
    React.startTransition(() => {
      setChartData(bufferRef.current.map((p, index) => ({index, price: p})));
    });

    // Animate line color on direction change
    if (prevPriceRef.current !== 0 && price !== prevPriceRef.current) {
      const direction = price > prevPriceRef.current ? 1 : -1;
      lineColorProgress.value = direction;
      lineColorProgress.value = withTiming(0, {duration: 800});
    }
    prevPriceRef.current = price;
  }, [price, lineColorProgress]);

  const chartFont = React.useMemo(() => {
    try {
      return matchFont({fontSize: 11});
    } catch {
      return null;
    }
  }, []);

  const openTradeSheet = React.useCallback(() => {
    tradeSheetRef.current?.open();
  }, []);

  const hasData = chartData.length > 1;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Current price */}
        <View style={styles.priceRow}>
          <Text style={styles.currentPrice}>{formatPrice(price)}</Text>
          <Text style={styles.symbol}>{asset.symbol}/USD</Text>
        </View>

        {/* Chart */}
        <View style={styles.chartContainer}>
          {hasData ? (
            <CartesianChart
              data={chartData}
              xKey="index"
              yKeys={['price']}
              domainPadding={{top: 16, bottom: 16}}
              padding={{left: 8, right: 8, top: 8, bottom: 8}}
              yAxis={[
                {
                  font: chartFont,
                  tickCount: 4,
                  labelColor: colors.secondary,
                  axisSide: 'right',
                  formatYLabel: value => {
                    const n = Number(value);
                    if (n >= 1000) {
                      return `$${(n / 1000).toFixed(1)}k`;
                    }
                    if (n >= 1) {
                      return `$${n.toFixed(0)}`;
                    }
                    return `$${n.toFixed(3)}`;
                  },
                },
              ]}>
              {({points}) => (
                <Line
                  points={points.price}
                  color={lineColor}
                  strokeWidth={2}
                  animate={{type: 'timing', duration: 200}}
                />
              )}
            </CartesianChart>
          ) : (
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartPlaceholderText}>
                Waiting for price data…
              </Text>
            </View>
          )}
        </View>

        {/* News */}
        <Text style={styles.sectionTitle}>Latest News</Text>
        {NEWS_ITEMS.map(item => (
          <View key={item.id} style={styles.newsItem}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsMeta}>
              {item.source} · {item.time}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Trade button */}
      <View style={[styles.footer, {paddingBottom: footerPaddingBottom}]}>
        <Pressable
          style={({pressed}) => [
            styles.tradeButton,
            pressed && styles.tradeButtonPressed,
          ]}
          onPress={openTradeSheet}>
          <Text style={styles.tradeButtonText}>Trade {asset.symbol}</Text>
        </Pressable>
      </View>

      <TradeBottomSheet
        ref={tradeSheetRef}
        asset={asset}
        bottomInset={effectiveTabBarHeight}
        onConfirm={() => {
          navigation.navigate('TradeSuccess', {symbol: asset.symbol});
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  priceRow: {
    marginBottom: 16,
    gap: 4,
  },
  currentPrice: {
    color: colors.onBackground,
    fontSize: 32,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  symbol: {
    color: colors.secondary,
    fontSize: 14,
  },
  chartContainer: {
    height: 220,
    marginBottom: 24,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  chartPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPlaceholderText: {
    color: colors.secondary,
    fontSize: 14,
  },
  sectionTitle: {
    color: colors.onBackground,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  newsItem: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    gap: 6,
  },
  newsTitle: {
    color: colors.onSurface,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  newsMeta: {
    color: colors.secondary,
    fontSize: 12,
  },
  footer: {
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  tradeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  tradeButtonPressed: {
    opacity: 0.8,
  },
  tradeButtonText: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AssetDetailsScreen;
