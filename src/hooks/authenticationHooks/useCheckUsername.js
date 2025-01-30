import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message'; // Import the toast library
import {checkUsernameRequest} from '../ApiRequiests/userApi';

const useCheckUsername = () => {
  const {
    mutate: checkUsername,
    isPending: checkUsernameLoading,
    isSuccess: checkUsernameSuccess,
    data: checkUsernameData,
  } = useMutation({
    mutationFn: payload => checkUsernameRequest(payload), // Call the function to check username availability
    onSuccess: data => {
      if (data?.data?.isAvailable) {
        // Show success toast if username is available
        Toast.show({
          type: 'success', // Type of toast
          text1: 'Username Available', // Main message
          text2: 'This username is available.', // Secondary message
          position: 'top', // Position of the toast
          visibilityTime: 3000, // Duration of the toast
          autoHide: true, // Auto-hide the toast
        });
      } else {
        // Show error toast if username is not available
        Toast.show({
          type: 'error', // Type of toast
          text1: 'Username Not Available', // Main message
          text2: 'This username is already taken.', // Secondary message
          position: 'top', // Position of the toast
          visibilityTime: 3000, // Duration of the toast
          autoHide: true, // Auto-hide the toast
        });
      }
    },
    onError: error => {
      // Show error toast if the request fails
      Toast.show({
        type: 'error', // Type of toast
        text1: 'Error', // Main message
        text2:
          error.message || 'An error occurred while checking the username.', // Secondary message
        position: 'top', // Position of the toast
        visibilityTime: 3000, // Duration of the toast
        autoHide: true, // Auto-hide the toast
      });
    },
  });

  return {
    checkUsername,
    checkUsernameLoading,
    checkUsernameSuccess,
    checkUsernameData,
  };
};

export default useCheckUsername;
