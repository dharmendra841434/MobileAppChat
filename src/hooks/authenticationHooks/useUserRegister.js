import {useMutation} from '@tanstack/react-query';
import {registerRequest} from '../ApiRequiests/userApi';
import Toast from 'react-native-toast-message';

const useUserRegister = ({handleSucces}) => {
  const {
    mutate: userRegister,
    isPending: userRegisterLoading,
    isSuccess: userRegisterSuccess,
  } = useMutation({
    mutationFn: payload => registerRequest(payload), // Call the function to create a new group
    onSuccess: () => {
      handleSucces();
      Toast.show({
        type: 'success', // Type of toast
        text1: 'Register Successful', // Main message
        text2: 'User registered  successfully!', // Secondary message
        position: 'top', // Position of the toast
        visibilityTime: 3000, // Duration of the toast
        autoHide: true, // Auto-hide the toast
      });
    },
    onError: error => {
      Toast.show({
        type: 'error', // Type of toast
        text1: 'Register Failed', // Main message
        text2: error.message || 'An error occurred during register.', // Secondary message
        position: 'top', // Position of the toast
        visibilityTime: 3000, // Duration of the toast
        autoHide: true, // Auto-hide the toast
      });
    },
  });

  return {
    userRegister,
    userRegisterLoading,
    userRegisterSuccess,
  };
};

export default useUserRegister;
