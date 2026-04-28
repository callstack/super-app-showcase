import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
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

// Fully implemented in US-7
const TradeBottomSheet = React.forwardRef<BottomSheetRef, Props>(
  (_props, ref) => {
    React.useImperativeHandle(ref, () => ({
      open: () => {},
      close: () => {},
    }));

    return (
      <View style={styles.hidden}>
        <Text style={styles.text}>Trade sheet — coming in US-7</Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  hidden: {
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none',
  },
  text: {
    color: colors.secondary,
  },
});

export default TradeBottomSheet;