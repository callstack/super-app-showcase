import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const AccountScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Account</Text>
      <View style={styles.contentContainer} />
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

export default AccountScreen;
