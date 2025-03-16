import Toast from 'react-native-toast-message';
import appFonts from '../constant/appFonts';

const showToast = (type: any, message: any) => {
  Toast.show({
    type: type, // "success", "error", "info"
    text1: message,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
    text1Style: {
      fontFamily: appFonts?.Typo_Round_Regular,
      fontSize: 14,
      color: type === 'error' ? 'red' : 'black',
    },
  });
};

export default showToast;
