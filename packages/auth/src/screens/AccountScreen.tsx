import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useBottomTabBarHeight} from 'react-native-bottom-tabs';
import {useAuth} from '../contexts/AuthContext';

const colors = {
  background: '#0A0E1A',
  surface: '#131929',
  surfaceVariant: '#1C2438',
  primary: '#4F8EF7',
  onPrimary: '#FFFFFF',
  secondary: '#A0AEC0',
  onSurface: '#E2E8F0',
  onBackground: '#E2E8F0',
  border: '#2D3748',
};

const AccountScreen = () => {
  const {signOut} = useAuth();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>Demo User</Text>
          <Text style={styles.subtitle}>demo@fintechapp.com</Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, {paddingBottom: tabBarHeight + 8}]}>
        <Pressable
          style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}
          onPress={signOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    gap: 6,
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
  footer: {
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AccountScreen;