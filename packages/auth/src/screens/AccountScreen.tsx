import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useAuth} from '../contexts/AuthContext';

const colors = {
  background: '#0A0E1A',
  surface: '#131929',
  surfaceVariant: '#1C2438',
  primary: '#4F8EF7',
  onPrimary: '#FFFFFF',
  secondary: '#A0AEC0',
  onSurface: '#E2E8F0',
  border: '#2D3748',
};

const AccountScreen = () => {
  const {signOut} = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Demo User</Text>
        <Text style={styles.subtitle}>demo@fintechapp.com</Text>
      </View>
      <Pressable
        style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}
        onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'space-between',
    paddingBottom: 48,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    gap: 6,
    marginTop: 8,
  },
  title: {
    color: colors.onSurface,
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.secondary,
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.surfaceVariant,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AccountScreen;