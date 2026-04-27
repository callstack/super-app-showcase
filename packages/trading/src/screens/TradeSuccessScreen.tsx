import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme';

const TradeSuccessScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>✓ — coming in US-7</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2ECC71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.onPrimary,
    fontSize: 32,
    fontWeight: '700',
  },
});

export default TradeSuccessScreen;