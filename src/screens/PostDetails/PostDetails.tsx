import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import baseService from '../../services/axios/baseService';
import {scale} from '../../utils';
import PostCard from '../../components/PostCard/PostCard';
import theme from '../../theme';
import Loading from '../../components/Loading/Loading';
import Input from '../../components/Input/Input';
import Icon from '../../components/Icon/Icon';
import useCreateCommentMutation from '../../services/ReactQuery/useCreateCommentMutation';
import CommentItem from '../../components/CommentItem/CommentItem';

const PostDetails = () => {
  const route = useRoute<any>();

  const {post, commentId} = route.params;

  console.log('Comment id: ', commentId);

  const inputRef = useRef<TextInput>(null);
  const commentRef = useRef('');

  const {
    data: response,
    isLoading: isFetchingComments,
    isError,
    error,
  } = useQuery({
    queryKey: ['comments', post.id],
    queryFn: () => baseService.get(`/comments/${post.id}`),
  });
  const mutation = useCreateCommentMutation();

  const handleCommentCreation = () => {
    if (commentRef.current === '') {
      return null;
    }
    mutation.mutate(
      {post_id: post.id, text: commentRef.current},
      {
        onSuccess: () => {
          console.log('Comment created successfully!');
          inputRef?.current?.clear();
          commentRef.current = '';
        },
      },
    );
  };

  if (!isFetchingComments) {
    console.log('Comments: ', response?.data.comments);
  }

  if (isFetchingComments) {
    return (
      <View style={styles.center}>
        <Loading />
      </View>
    );
  }

  if (isError) {
    console.log('Post', error.message);
  }

  if (mutation.isError) {
    Alert.alert('Post', mutation.error.message);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}>
        <PostCard item={post} showMoreIcon={false} onPress={() => {}} />

        {/* comment input */}

        <View style={styles.inputContainer}>
          <Input
            inputRef={inputRef}
            onChangeText={(text: string) => (commentRef.current = text)}
            placeholder="Type comment.."
            placeholderTextColor={theme.palette.textLight}
            containerStyles={{
              flex: 1,
              height: scale(55),
              borderRadius: theme.spacing.radius.xl,
            }}
          />

          {mutation.isPending ? (
            <View style={styles.loading}>
              <Loading size="small" />
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.sendIcon}
              onPress={() => handleCommentCreation()}>
              <Icon name="send" color={theme.palette.primaryDark} />
            </TouchableOpacity>
          )}
        </View>

        {/* comment list */}
        <View
          style={{
            marginVertical: scale(15),
            gap: scale(17),
          }}>
          {response?.data?.comments.length > 0 ? (
            response?.data.comments.map((comment: any) => (
              <CommentItem
                key={comment.id.toString()}
                item={comment}
                highlight={comment.id == commentId}
              />
            ))
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginVertical: scale(15),
              }}>
              <Text
                style={{
                  color: theme.palette.textLight,
                  marginLeft: scale(5),
                }}>
                Be first to comment!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: scale(15),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  list: {
    paddingHorizontal: scale(10),
  },
  sendIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: theme.palette.primary,
    borderRadius: theme.spacing.radius.lg,
    borderCurve: 'continuous',
    height: scale(55),
    width: scale(55),
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    fontSize: 16,
    color: theme.palette.text,
    fontWeight: '500',
  },
  loading: {
    height: scale(55),
    width: scale(55),
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{scale: 1.3}],
  },
});
