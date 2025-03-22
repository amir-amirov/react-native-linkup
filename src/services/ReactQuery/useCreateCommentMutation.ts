import {useMutation, useQueryClient} from '@tanstack/react-query';
import baseService from '../axios/baseService';
import {Alert} from 'react-native';

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPost: {post_id: number; text: string}) =>
      baseService.post(`/comments/${newPost.post_id}`, newPost),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', variables.post_id],
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

export default useCreateCommentMutation;
