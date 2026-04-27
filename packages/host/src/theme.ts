import {MD3DarkTheme} from 'react-native-paper';

export const colors = {
  background: '#0A0E1A',
  surface: '#131929',
  surfaceVariant: '#1C2438',
  primary: '#4F8EF7',
  onPrimary: '#FFFFFF',
  secondary: '#A0AEC0',
  onSurface: '#E2E8F0',
  onBackground: '#E2E8F0',
  priceUp: '#2ECC71',
  priceDown: '#E74C3C',
  border: '#2D3748',
};

export const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: colors.background,
    surface: colors.surface,
    surfaceVariant: colors.surfaceVariant,
    primary: colors.primary,
    onPrimary: colors.onPrimary,
    secondary: colors.secondary,
    onSurface: colors.onSurface,
    onBackground: colors.onBackground,
  },
};