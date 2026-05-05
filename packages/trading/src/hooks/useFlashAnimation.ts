import React from 'react';
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {colors} from 'super-app-showcase-sdk';

export const useFlashAnimation = (value: number) => {
  const prevRef = React.useRef(0);
  const isUp = useSharedValue(true);
  const progress = useSharedValue(0);

  React.useEffect(() => {
    if (prevRef.current !== 0 && value !== prevRef.current) {
      isUp.value = value > prevRef.current;
      progress.value = withSequence(
        withTiming(1, {duration: 150}),
        withTiming(0, {duration: 600}),
      );
    }
    prevRef.current = value;
  }, [value, progress, isUp]);

  return useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.transparent, isUp.value ? colors.priceUp : colors.priceDown],
    ),
  }));
};