import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
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
import Header from '../../components/Header/Header';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';

const PostDetails = () => {
  const {t} = useTranslation();
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
      <StatusBar
        backgroundColor={theme.palette.white}
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}
      />
      <View style={{paddingHorizontal: scale(15)}}>
        <Header title="Post" showBackButton={true} mb={scale(20)} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}>
        <PostCard item={post} showMoreIcon={false} onPress={() => {}} />

        {/* comment input */}

        <View style={styles.inputContainer}>
          <Input
            inputRef={inputRef}
            onChangeText={(text: string) => (commentRef.current = text)}
            placeholder={t('comment_input_placeholder')}
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
                {t('no_comments')}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PostDetails;
