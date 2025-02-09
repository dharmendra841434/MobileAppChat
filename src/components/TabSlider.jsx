import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import appColors from '../constant/appColors';
import CustomText from './CustomText';

const {width} = Dimensions.get('window');

const TabSlider = () => {
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useSharedValue(0);

  const switchTab = index => {
    setActiveTab(index);
    translateX.value = withTiming(index * (width / 2), {duration: 300});
  };

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity style={styles.tab} onPress={() => switchTab(0)}>
        <CustomText
          style={[styles.tabText, activeTab === 0 && styles.activeText]}>
          All People
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => switchTab(1)}>
        <CustomText
          style={[styles.tabText, activeTab === 1 && styles.activeText]}>
          Pending Requests
        </CustomText>
      </TouchableOpacity>
      <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: appColors.background},
  tabContainer: {
    flexDirection: 'row',
    position: 'relative',

    overflow: 'hidden',
  },
  tab: {flex: 1, padding: 15, alignItems: 'center'},
  tabText: {fontSize: 16, color: 'gray'},
  activeText: {color: appColors.primary, fontWeight: 'bold'},
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width / 2,
    height: 4,
    backgroundColor: appColors.primary,
    borderRadius: 2,
  },
  contentContainer: {padding: 20, alignItems: 'center', marginTop: 20},
  contentText: {fontSize: 18, color: 'black'},
});

export default TabSlider;
