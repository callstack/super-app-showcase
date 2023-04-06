import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useAuth} from '../contexts/AuthContext';
import {EmailForm} from './EmailForm';

const AccountScreen = () => {
  const {signOut} = useAuth();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <EmailForm />
      <View style={styles.logoutButtonContainer}>
        <Button buttonColor="red" mode="contained" onPress={signOut}>
          Logout
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  logoutButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 8,
  },
});

export default AccountScreen;
