import {Federated} from '@callstack/repack/client';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Booking = React.lazy(() => Federated.importModule('booking', './App'));

const BookingScreen = () => {
  return (
    <React.Suspense
      fallback={
        <View style={styles.contentContainer}>
          <Text style={styles.header}>Loading...</Text>
        </View>
      }>
      <Booking />
    </React.Suspense>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    padding: 16,
    fontSize: 24,
  },
});

export default BookingScreen;
