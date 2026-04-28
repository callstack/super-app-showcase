import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LegendList} from '@legendapp/list';
import {useAssetPrice} from 'super-app-showcase-sdk';
import {HOLDINGS, type Holding} from '../constants';
import HoldingRow from '../components/HoldingRow';
import {colors} from '../theme';

const formatCurrency = (value: number): string =>
  value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  });

const TotalBalance = () => {
  const btcPrice = useAssetPrice('BTC');
  const ethPrice = useAssetPrice('ETH');

  const total =
    HOLDINGS[0].quantity * btcPrice + HOLDINGS[1].quantity * ethPrice;

  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceLabel}>Total Portfolio Value</Text>
      <Text style={styles.balanceAmount}>
        {total > 0 ? formatCurrency(total) : '—'}
      </Text>
      <Text style={styles.balanceSubtext}>Updates in real-time</Text>
    </View>
  );
};

const renderHolding = ({item}: {item: Holding}) => (
  <HoldingRow holding={item} />
);

const WalletScreen = () => {
  return (
    <View style={styles.container}>
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