import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message'; // Import the toast library
import {loginRequest} from '../ApiRequiests/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Replace localStorage with AsyncStorage
import {useNavigation} from '@react-navigation/native'; // Replace next/navigation with React Navigation
import Storage from '../../utils/AsyncStorage';
const useLoginUser = () => {
  const navigation = useNavigation(); // Use React Navigation instead of Next.js router

  const {
    mutate: loginUser,
    data: success,
    isPending: isLoading,
    error: LoginError,
  } = useMutation({
    mutationFn: ({data}) => loginRequest(data),
    onSuccess: async data => {
      // Show success toast
      Toast.show({
        type: 'success', // Type of toast
        text1: 'Login Successful', // Main message
        text2: 'User logged in successfully!', // Secondary message
        position: 'top', // Position of the toast
        visibilityTime: 3000, // Duration of the toast
        autoHide: true, // Auto-hide the toast
      });

      await Storage.setItem('token', data?.data?.token);
      // Navigate to the dashboard
      navigation.navigate('dashboard'); // Replace with your screen name
    },
    onError: error => {
      console.log(error);

      // Show error toast
      Toast.show({
        type: 'error', // Type of toast
        text1: 'Login Failed', // Main message
        text2: error.message || 'An error occurred during login.', // Secondary message
        position: 'top', // Position of the toast
        visibilityTime: 3000, // Duration of the toast
        autoHide: true, // Auto-hide the toast
      });
    },
  });

  return {loginUser, success, isLoading, LoginError};
};

export default useLoginUser;
