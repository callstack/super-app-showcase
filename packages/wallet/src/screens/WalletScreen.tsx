import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LegendList} from '@legendapp/list';
import {usePrices, ASSET_MAP, formatValue, colors, ConnectionBanner} from 'super-app-showcase-sdk';
import {HOLDINGS, type Holding} from '../constants';
import HoldingRow from '../components/HoldingRow';

const TotalBalance = () => {
  const prices = usePrices();
  const total = HOLDINGS.reduce(
    (sum, h) => sum + h.quantity * (prices[h.symbol] ?? 0),
    0,
  );

  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceLabel}>Total Portfolio Value</Text>
      <Text style={styles.balanceAmount}>{formatValue(total)}</Text>
      <Text style={styles.balanceSubtext}>Updates in real-time</Text>
    </View>
  );
};

const renderHolding = ({item}: {item: Holding}) => (
  <HoldingRow holding={item} asset={ASSET_MAP[item.symbol]} />
);

const WalletScreen = () => {
  return (
    <View style={styles.container}>
      <ConnectionBanner />
      <LegendList
        data={HOLDINGS}
        keyExtractor={item => item.symbol}
        renderItem={renderHolding}
        estimatedItemSize={84}
        ListHeaderComponent={
          <View style={styles.header}>
            <TotalBalance />
            <Text style={styles.sectionTitle}>My Holdings</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
  },
  header: {
    gap: 24,
    marginBottom: 8,
  },
  balanceCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 6,
  },
  balanceLabel: {
    color: colors.secondary,
    fontSize: 14,
  },
  balanceAmount: {
    color: colors.onBackground,
    fontSize: 36,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  balanceSubtext: {
    color: colors.secondary,
    fontSize: 12,
  },
  sectionTitle: {
    color: colors.onBackground,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WalletScreen;