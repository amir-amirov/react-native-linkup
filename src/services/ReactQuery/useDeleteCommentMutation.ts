import {useMutation, useQueryClient} from '@tanstack/react-query';
import baseService from '../axios/baseService';
import {Alert} from 'react-native';

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment_id: number) =>
      baseService.delete(`/comments/${comment_id}`),
    onSuccess: (variables: any) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', variables.data.post_id],
      });
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        Alert.alert('Error', error.response.data.message);
      }
      Alert.alert('Unexpected error occured..');
    },
    // retry: 3,
  });
};

export default useDeleteCommentMutation;
