import React, {useRef, useEffect} from 'react';
import {
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
  Easing,
} from 'react-native';

const {height} = Dimensions.get('window');

const CustomBottomSheet = ({
  isVisible,
  onClose,
  renderContent,
  sheetHeight = height * 0.5,
}) => {
  const translateY = useRef(new Animated.Value(sheetHeight)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
      onPanResponderMove: (_, gestureState) => {
        const newTranslateY = Math.max(gestureState.dy, 0);
        translateY.setValue(newTranslateY);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > sheetHeight * 0.2) {
          handleCloseModal();
        } else {
          snapBack();
        }
      },
    }),
  ).current;

  const handleCloseModal = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: sheetHeight,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const snapBack = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 350,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isVisible) {
      translateY.setValue(sheetHeight);
      overlayOpacity.setValue(0);

      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 350,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      onRequestClose={handleCloseModal}
      transparent
      statusBarTranslucent
      animationType="fade">
      <TouchableWithoutFeedback onPress={handleCloseModal}>
        <Animated.View style={[styles.overlay, {opacity: overlayOpacity}]} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.modalContent,
          {transform: [{translateY}], height: sheetHeight},
        ]}
        {...panResponder.panHandlers}>
        <Pressable style={{flex: 1}}>{renderContent?.()}</Pressable>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: 'rgb(245 246 252)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
});

export default CustomBottomSheet;
