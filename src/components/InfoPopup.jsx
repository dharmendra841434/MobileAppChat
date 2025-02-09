import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomText from './CustomText';

const InfoPopup = ({isOpen, setIsOpen}) => {
  // Toggle the popup
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // Close the popup when clicking outside
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <View>
      {/* Popup */}
      <Modal
        transparent
        visible={isOpen}
        animationType="fade"
        onRequestClose={handleClose}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.popup}>
                <TouchableOpacity className="px-5 py-3  ">
                  <CustomText>Info</CustomText>
                </TouchableOpacity>
                <View className=" bg-gray-300 h-[1px] w-full " />
                <TouchableOpacity className="px-5 py-3 ">
                  <CustomText>Delete</CustomText>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  infoButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10,
    top: '5%',
    right: '3%',
    width: '45%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  popupText: {
    color: '#333',
    textAlign: 'center',
  },
});

export default InfoPopup;
