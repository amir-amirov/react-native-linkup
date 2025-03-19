import {useMutation, useQueryClient} from '@tanstack/react-query';
import baseService from '../axios/baseService';
import {Alert} from 'react-native';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPost: {body: string; file: string}) =>
      baseService.post('/posts', newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['posts']});
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        Alert.alert('Error', error.response.data.message[0]);
      }
      Alert.alert('Unexpected error occured..');
    },
    // retry: 3,s
  });
};

export default useCreatePostMutation;
