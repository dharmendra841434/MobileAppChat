import {useMutation, useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message'; // Import the toast library
import {createGroupRequest} from '../ApiRequiests/userApi';

const useCreateGroup = () => {
  const queryClient = useQueryClient(); // Get the query client instance
  const {
    mutate: createGroup,
    isPending: createGroupLoading,
    isSuccess: createGroupSuccess,
  } = useMutation({
    mutationFn: payload => createGroupRequest(payload), // Call the function to create a new group
    onSuccess: () => {
      Toast.show({
        type: 'success', // Type of toast
        text1: 'Group created successfully!', // Main message
        position: 'top', // Position of the toast
        visibilityTime: 3000, // Duration of the toast
        autoHide: true, // Auto-hide the toast
      });
      queryClient.invalidateQueries(['groupsList']);
    },
    onError: error => {
      Toast.show({
        type: 'error', // Type of toast
        text1: 'Group creation failed', // Main message
        text2: error.message, // Secondary message (error details)
        position: 'top', // Position of the toast
        visibilityTime: 3000, // Duration of the toast
        autoHide: true, // Auto-hide the toast
      });
    },
  });

  return {
    createGroup,
    createGroupLoading,
    createGroupSuccess,
  };
};

export default useCreateGroup;
