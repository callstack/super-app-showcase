import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useAuth} from '../contexts/AuthContext';

const SignInScreen = () => {
  const {signIn} = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>₿</Text>
        <Text variant="headlineLarge" style={styles.appName}>
          Fintech Super App
        </Text>
        <Text variant="bodyMedium" style={styles.tagline}>
          Trading & Portfolio Management
        </Text>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}
          onPress={signIn}>
          <Text variant="labelLarge" style={styles.buttonText}>
            Sign In as Demo User
          </Text>
        </Pressable>
        <Text variant="bodySmall" style={styles.disclaimer}>
          Demo mode — no real credentials required
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0E1A',
    flex: 1,
    justifyContent: 'space-between',
    padding: 32,
    paddingTop: 120,
    paddingBottom: 64,
  },
  header: {
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    fontSize: 64,
    color: '#4F8EF7',
  },
  appName: {
    color: '#E2E8F0',
    fontWeight: '700',
    textAlign: 'center',
  },
  tagline: {
    color: '#A0AEC0',
    textAlign: 'center',
  },
  footer: {
    gap: 16,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  disclaimer: {
    color: '#A0AEC0',
  },
});

export default SignInScreen;