import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import type {Asset} from 'super-app-showcase-sdk';
import {colors} from '../theme';

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
}

interface Props {
  asset: Asset;
  onConfirm: () => void;
}

const SNAP_POINTS = ['45%'];

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    disappearsOnIndex={-1}
    appearsOnIndex={0}
    opacity={0.6}
  />
);

const TradeBottomSheet = React.forwardRef<BottomSheetRef, Props>(
  ({asset, onConfirm}, ref) => {
    const sheetRef = React.useRef<BottomSheet>(null);
    const amountRef = React.useRef('');

    React.useImperativeHandle(ref, () => ({
      open: () => sheetRef.current?.expand(),
      close: () => sheetRef.current?.close(),
    }));

    const handleConfirm = React.useCallback(() => {
      sheetRef.current?.close();
      onConfirm();
    }, [onConfirm]);

    const handleCancel = React.useCallback(() => {
      sheetRef.current?.close();
    }, []);

    return (
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={SNAP_POINTS}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.indicator}>
        <BottomSheetView style={styles.content}>
          <Text style={styles.title}>Trade {asset.name}</Text>
          <Text style={styles.subtitle}>{asset.symbol}/USD</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Amount (USD)</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              placeholderTextColor={colors.secondary}
              keyboardType="decimal-pad"
              defaultValue=""
              onChangeText={text => {
                amountRef.current = text;
              }}
            />
          </View>

          <View style={styles.actions}>
            <Pressable
              style={({pressed}) => [
                styles.cancelButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={({pressed}) => [
                styles.confirmButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleConfirm}>
              <Text style={styles.confirmText}>Confirm Trade</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.surface,
  },
  indicator: {
    backgroundColor: colors.border,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
    gap: 16,
  },
  title: {
    color: colors.onSurface,
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.secondary,
    fontSize: 14,
    marginTop: -8,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    color: colors.secondary,
    fontSize: 13,
  },
  input: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.onSurface,
    fontSize: 18,
    fontWeight: '500',
    fontVariant: ['tabular-nums'],
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.surfaceVariant,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 2,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  cancelText: {
    color: colors.secondary,
    fontSize: 15,
    fontWeight: '600',
  },
  confirmText: {
    color: colors.onPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default TradeBottomSheet;