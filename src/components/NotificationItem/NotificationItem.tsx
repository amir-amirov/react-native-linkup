import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';
import {scale} from '../../utils';
import theme from '../../theme';
import Avatar from '../Avatar/Avatar';
import moment from 'moment';

interface Props {
  item: any;
  onPress: () => void;
}

const NotificationItem: React.FC<Props> = ({item, onPress}) => {
  return (
    <TouchableHighlight
      underlayColor={theme.palette.gray}
      style={styles.container}
      onPress={onPress}>
      <View style={styles.innerContainer}>
        <Avatar uri={item.sender.image} size={scale(40)} />
        <View style={styles.nameTitle}>
          <Text style={styles.text} numberOfLines={1}>
            {item?.sender?.name}
          </Text>
          <Text style={[styles.text, {color: theme.palette.textDark}]}>
            {item?.type == 'comment' ? 'commented on' : 'liked'} your post
          </Text>
        </View>

        <Text style={[styles.text, {color: theme.palette.textLight}]}>
          {moment(item.created_at).format('MMM d')}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // gap: scale(12),
    backgroundColor: theme.palette.white,
    borderWidth: 0.5,
    borderColor: theme.palette.darkLight,
    padding: scale(15),
    borderRadius: theme.spacing.radius.xxl,
    borderCurve: 'continuous',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: scale(12),
  },
  nameTitle: {
    flex: 1,
    gap: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.palette.text,
  },
});
