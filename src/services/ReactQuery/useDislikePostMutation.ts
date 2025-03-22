import {useMutation} from '@tanstack/react-query';
import baseService from '../axios/baseService';
import {Alert} from 'react-native';

export const useDislikePostMutation = () => {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: number) => baseService.delete(`/likes/${postId}`),
    onSuccess: () => {
      //   queryClient.invalidateQueries({queryKey: ['posts']});
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        console.log('Error: ', error.response.data.message[0]);
      }
      //   Alert.alert('Unexpected error occured..');
    },
    // retry: 3,s
  });
};

export default useDislikePostMutation;
