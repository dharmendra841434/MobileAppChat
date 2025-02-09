import {useMutation, useQueryClient} from '@tanstack/react-query';
import {joinGroupRequest} from '../ApiRequiests/userApi';
import Toast from 'react-native-toast-message';

const useJoinGroup = setVisible => {
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
        text1: 'Group Join successfully!', // Main message
        position: 'top', // Position of the toast
        visibilityTime: 3000, // Duration of the toast
        autoHide: true, // Auto-hide the toast
      });
      queryClient.invalidateQueries(['groupsList']);
      setVisible(false);
    },
    onError: error => {
      Toast.show({
        type: 'error', // Type of toast
        text1: 'Group Joined failed', // Main message
        text2: error.message, // Secondary message (error details)
        position: 'top', // Position of the toast
        visibilityTime: 3000, // Duration of the toast
        autoHide: true, // Auto-hide the toast
      });
      setVisible(false);
    },
  });

  return {
    joinGroup,
    joinGroupLoading,
    joinGroupSuccess,
  };
};

export default useJoinGroup;
