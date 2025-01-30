import {useMutation, useQueryClient} from '@tanstack/react-query';
import {joinGroupRequest} from '../ApiRequiests/userApi';
import Toast from 'react-native-toast-message';

const useJoinGroup = () => {
  const queryClient = useQueryClient(); // Get the query client instance
  const {
    mutate: joinGroup,
    isPending: joinGroupLoading,
    isSuccess: joinGroupSuccess,
  } = useMutation({
    mutationFn: payload => joinGroupRequest(payload), // Call the function to create a new group
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
    joinGroup,
    joinGroupLoading,
    joinGroupSuccess,
  };
};

export default useJoinGroup;
