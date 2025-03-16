import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteGroupRequest} from '../ApiRequiests/userApi';
import showToast from '../../utils/showToast';

const useDeleteGroup = ({setThreedot}) => {
  const queryClient = useQueryClient(); // Get the query client instance

  const {
    mutate: deleteGroup,
    isPending: deleteGroupLoading,
    isSuccess: deleteGroupSuccess,
  } = useMutation({
    mutationFn: groupKey => deleteGroupRequest(groupKey),
    onSuccess: () => {
      showToast('success', '✅ Group deleted successfully!');
      queryClient.invalidateQueries(['groupsList']);
      setThreedot(false);
    },
    onError: error => {
      showToast('error', `❌ Delete failed: ${error?.response?.data?.message}`);
      setThreedot(false);
    },
  });

  return {
    deleteGroup,
    deleteGroupLoading,
    deleteGroupSuccess,
  };
};

export default useDeleteGroup;
