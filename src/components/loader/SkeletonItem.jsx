import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const SkeletonItem = () => {
  const opacity = useSharedValue(1);

  opacity.value = withRepeat(
    withTiming(0.5, {duration: 1000, easing: Easing.inOut(Easing.ease)}),
    -1,
    true,
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return <Animated.View style={[styles.skeletonItem, animatedStyle]} />;
};

const styles = StyleSheet.create({
  skeletonItem: {
    height: 60,
    backgroundColor: '#e1e1e1',
    marginBottom: 10,
    borderRadius: 4,
  },
});

export default SkeletonItem;
