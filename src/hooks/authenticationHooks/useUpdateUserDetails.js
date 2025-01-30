import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateUserDetails} from '../utility/api/userApi';
import {useNavigate} from 'react-router-dom';
import Toast from 'react-native-toast-message';

const useUpdateUserDetails = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Get the query client instance
  const {
    mutate: updateUser,
    data: successData,
    isLoading: updateLoading,
    isError: updateIsError,
    error: updateError,
  } = useMutation({
    mutationFn: ({userID, data}) =>
      updateUserDetails({
        user_id: userID,
        data: data,
      }),
    onSuccess: () => {
      Toast.show({
        type: 'success', // Type of toast
        text1: 'Login Successful', // Main message
        text2: 'User logged in successfully!', // Secondary message
        position: 'top', // Position of the toast
        visibilityTime: 3000, // Duration of the toast
        autoHide: true, // Auto-hide the toast
      });
      queryClient.invalidateQueries(['usersList']);
      navigate(-1);
    },
    onError: error => {
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

  return {updateUser, successData, updateLoading, updateIsError, updateError};
};

export default useUpdateUserDetails;
