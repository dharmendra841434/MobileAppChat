import Toast from 'react-native-toast-message';

const showToast = (type: any, message: any) => {
  Toast.show({
    type: type, // "success", "error", "info"
    text1: message,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
  });
};

export default showToast;
