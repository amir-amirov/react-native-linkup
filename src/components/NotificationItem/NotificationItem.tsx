import {Text, TouchableHighlight, View} from 'react-native';
import React from 'react';
import {scale} from '../../utils';
import theme from '../../theme';
import Avatar from '../Avatar/Avatar';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';

interface Props {
  item: any;
  onPress: () => void;
}

const NotificationItem: React.FC<Props> = ({item, onPress}) => {
  const {t} = useTranslation();
  return (
    <TouchableHighlight
      underlayColor={theme.palette.gray}
      style={styles.container}
      onPress={onPress}>
      <View style={styles.innerContainer}>
        <Avatar uri={item.sender.image} size={scale(40)} />
        <View style={styles.nameTitle}>
          <Text numberOfLines={1} style={styles.text}>
            {item?.sender?.name}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.text, {color: theme.palette.textDark}]}>
            {item?.type == 'comment'
              ? t('comment_notification')
              : t('like_notification')}
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
