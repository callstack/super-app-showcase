import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

interface Props {
  onBackPress: () => void;
}

const App = ({onBackPress}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Booking</Text>
      <View style={styles.contentContainer}>
        <Button title="Back" onPress={onBackPress} />
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
