import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale, WINDOW_WIDTH} from '../../utils';
import theme from '../../theme';
import Avatar from '../Avatar/Avatar';
import moment from 'moment';
import Icon from '../Icon/Icon';
import RenderHTML from 'react-native-render-html';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';

const textStyle = {
  color: theme.palette.dark,
  fontSize: 14,
};
const tagStyles = {
  div: textStyle,
  p: textStyle,
  ol: textStyle,
  h1: {
    color: theme.palette.dark,
  },
  h4: {
    color: theme.palette.dark,
  },
};

const PostCard = ({item, currentUser}: any) => {
  const navigation = useNavigation<any>();
  const createdAt = moment(item.created_at).format('MMM D');
  return (
    <View style={[styles.container, styles.shadowStyles]}>
      <View style={styles.header}>
        {/* user info and post time */}
        <View style={styles.userInfo}>
          <Avatar
            size={scale(50)}
            uri={item.user_image}
            rounded={theme.spacing.radius.md}
          />

          <View style={{gap: scale(2)}}>
            <Text style={styles.username} numberOfLines={1}>
              {item.user_name}
            </Text>
            <Text style={styles.postTime}>{createdAt}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => {}} hitSlop={scale(5)}>
          <Icon
            name="threeDotsHorizontal"
            size={scale(30)}
            strokeWidth={scale(3)}
            color={theme.palette.text}
          />
        </TouchableOpacity>
      </View>

      {/* post body & media */}

      <View style={styles.content}>
        <View style={styles.postBody}>
          {item.body && (
            <RenderHTML
              contentWidth={WINDOW_WIDTH}
              source={{html: item?.body}}
              tagsStyles={tagStyles}
            />
          )}
        </View>

        {/* post image */}
        {item.file && item.file.includes('image') && (
          <FastImage
            source={{uri: item.file, cache: FastImage.cacheControl.immutable}}
            style={styles.postMedia}
          />
        )}
        {/* post image */}
        {item.file && item.file.includes('video') && (
          <Video
            source={{uri: item.file}}
            style={[styles.postMedia, {height: scale(200)}]}
            controls={true}
            resizeMode="cover"
          />
        )}
      </View>

      {/* like comment and share */}
      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <TouchableOpacity activeOpacity={0.5}>
            <Icon
              name="heart"
              size={scale(24)}
              color={theme.palette.textLight}
            />
          </TouchableOpacity>
          <Text style={styles.count}>{item.likesCount}</Text>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Comments')}>
            <Icon
              name="comment"
              size={scale(24)}
              color={theme.palette.textLight}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity activeOpacity={0.5}>
            <Icon
              name="share"
              size={scale(24)}
              color={theme.palette.textLight}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    gap: scale(10),
    marginBottom: scale(15),
    borderRadius: theme.spacing.radius.xxl * 1.1,
    borderCurve: 'continuous',
    padding: scale(10),
    paddingVertical: scale(12),
    backgroundColor: theme.palette.white,
    borderWidth: 0.5,
    borderColor: theme.palette.gray,
    shadowColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  username: {
    fontSize: 16,
    color: theme.palette.textDark,
    fontWeight: '600',
  },
  postTime: {
    fontSize: 14,
    color: theme.palette.textLight,
    fontWeight: '500',
  },
  content: {
    gap: scale(10),
  },
  postMedia: {
    height: scale(250),
    width: '100%',
    borderRadius: theme.spacing.radius.xl,
    borderCurve: 'continuous',
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
  },
  postBody: {
    marginLeft: scale(5),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  footerButton: {
    marginLeft: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(18),
  },
  count: {
    color: theme.palette.text,
    fontSize: 16,
  },
  shadowStyles: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
});
