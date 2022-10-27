import {Federated} from '@callstack/repack/client';
import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const Booking = React.lazy(() => Federated.importModule('booking', './App'));

const App = () => {
  const [booking, setBooking] = React.useState(false);

  if (booking) {
    return (
      <React.Suspense
        fallback={
          <View style={styles.contentContainer}>
            <Text style={styles.header}>Booking</Text>
          </View>
        }>
        <Booking onBackPress={() => setBooking(false)} />
      </React.Suspense>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Host</Text>
      <View style={styles.contentContainer}>
        <Button title="Booking" onPress={() => setBooking(true)} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

export default App;
