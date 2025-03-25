import {Alert, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale} from '../../utils';
import theme from '../../theme';
import Avatar from '../Avatar/Avatar';
import moment from 'moment';
import Icon from '../Icon/Icon';
import {useUser} from '../../store/user';
import useDeleteCommentMutation from '../../services/ReactQuery/useDeleteCommentMutation';
import {styles} from './styles';

interface Props {
  item: any;
  highlight: boolean;
}

const CommentItem: React.FC<Props> = ({item, highlight}) => {
  const {user} = useUser();
  const mutation = useDeleteCommentMutation();

  const handleDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete the comment?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Comment deletion cancelled'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => mutation.mutate(item.id),
        style: 'destructive',
      },
    ]);
  };

  if (mutation.isError) {
    Alert.alert('Comment', mutation.error);
  }

  return (
    <View style={styles.container}>
      <Avatar uri={item.user_image} />
      <View style={[styles.content, highlight && styles.highlight]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={styles.nameContainer}>
            <Text style={styles.text}>{item.user_name}</Text>
            <Text>{'\u2022'}</Text>
            <Text style={[styles.text, {color: theme.palette.textLight}]}>
              {moment(item.created_at).format('MMM d')}
            </Text>
          </View>
          {(user?.id === item.user_id || user?.id === item.post_owner_id) && (
            <TouchableOpacity onPress={() => handleDelete()}>
              <Icon name="delete" size={scale(20)} color={theme.palette.rose} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={[styles.text, {fontWeight: '400'}]}>{item.text}</Text>
      </View>
    </View>
  );
};

export default CommentItem;
