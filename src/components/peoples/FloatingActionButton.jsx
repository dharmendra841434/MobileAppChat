import React, {useState} from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const FloatingActionButton = () => {
  const [expanded, setExpanded] = useState(false);
  const animation = useSharedValue(0);

  const toggleMenu = () => {
    setExpanded(!expanded);
    animation.value = expanded ? 0 : 1;
  };

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{translateY: withSpring(animation.value === 1 ? -140 : 0)}],
  }));

  const animatedStyle3 = useAnimatedStyle(() => ({
    transform: [{translateY: withSpring(animation.value === 1 ? -70 : 0)}],
  }));

  return (
    <View style={styles.container}>
      {/* Menu Buttons */}
      <Animated.View style={[styles.secondary, animatedStyle1]}>
        <Text style={styles.text}>Create Group</Text>
      </Animated.View>

      <Animated.View style={[styles.secondary, animatedStyle3]}>
        <Text style={styles.text}>Join Group</Text>
      </Animated.View>

      {/* Main Button */}
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <View style={[styles.button, styles.main]}>
          <Text style={styles.text}>+</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    alignItems: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  main: {
    backgroundColor: '#D29CF3',
  },
  secondary: {
    backgroundColor: '#6CCDB4',
    position: 'absolute',
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default FloatingActionButton;
