import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

export const timeAgo = (timestamp: any) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now - time) / 1000);

  if (diffInSeconds < 60) return `Just now`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} days ago`;
};

export function getInitials(fullName: any) {
  // console.log('====================================');
  // console.log(fullName);
  // console.log('====================================');
  return fullName
    ?.split(' ') // Split the name into words
    ?.map((word: any) => word?.charAt(0)?.toUpperCase()) // Get first letter of each word and uppercase it
    ?.join(''); // Join them together
}

const handleMediaSelection = async (type = 'camera') => {
  return new Promise((resolve, reject) => {
    const options = {
      mediaType: 'photo', // Change to 'video' or 'mixed' if needed
      quality: 1,
    };

    const callback = response => {
      if (response.didCancel) {
        Toast.show({
          type: 'error',
          text1: 'Cancelled the action',
          text2: 'User cancelled the action',
          position: 'top',
          visibilityTime: 3000,
          autoHide: true,
        });
        reject('User cancelled the action');
      } else if (response.errorCode) {
        Toast.show({
          type: 'error',
          text1: 'Cancelled the action',
          text2: response.errorMessage,
          position: 'top',
          visibilityTime: 3000,
          autoHide: true,
        });
        reject(`Error: ${response.errorMessage}`);
      } else {
        resolve(response.assets);
      }
    };

    if (type === 'camera') {
      launchCamera(options, callback);
    } else if (type === 'gallery') {
      launchImageLibrary(options, callback);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid selection type',
        text2: 'Invalid selection type',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      });
      reject('Invalid selection type');
    }
  });
};

export default handleMediaSelection;
