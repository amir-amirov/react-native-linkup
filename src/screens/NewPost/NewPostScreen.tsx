import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import theme from '../../theme';
import Header from '../../components/Header/Header';
import {scale} from '../../utils';
import Avatar from '../../components/Avatar/Avatar';
import {useUser} from '../../store/user';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
import {useNavigation} from '@react-navigation/native';
import Icon from '../../components/Icon/Icon';
import Button from '../../components/Buttons/Button/Button';

const NewPostScreen = () => {
  const {user} = useUser();

  const bodyRef = useRef('');
  const editorRef = useRef('');

  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState();

  const onPick = (isImage: boolean) => {};

  const onSubmit = () => {};

  return (
    <ScreenWrapper bgView={theme.palette.white}>
      <View style={styles.container}>
        <Header title="Create Post" showBackButton={true} />
        <ScrollView contentContainerStyle={{gap: scale(20)}}>
          <View style={styles.header}>
            <Avatar
              uri={user ? user.image : null}
              size={scale(60)}
              rounded={theme.spacing.radius.xl}
            />
            <View style={{gap: scale(2)}}>
              <Text style={styles.username}>{user && user.name}</Text>
              <Text style={styles.publicText}>Public</Text>
            </View>
          </View>

          <View style={styles.textEditor}>
            <RichTextEditor
              editorRef={editorRef}
              onChange={(body: any) => (bodyRef.current = body)}
            />
          </View>

          <View style={styles.media}>
            <Text style={styles.addImageText}>Add to your post</Text>
            <View style={styles.mediaIcons}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => onPick(true)}>
                <Icon
                  name="image"
                  size={scale(30)}
                  color={theme.palette.dark}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => onPick(false)}>
                <Icon
                  name="video"
                  size={scale(33)}
                  color={theme.palette.dark}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <Button
          buttonStyle={{height: scale(60)}}
          title="Post"
          loading={false}
          onPress={() => onSubmit()}
        />
      </View>
    </ScreenWrapper>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
    gap: scale(20),
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.palette.text,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.palette.text,
  },
  avatar: {
    height: scale(70),
    width: scale(70),
    borderRadius: theme.spacing.radius.xl,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  publicText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.palette.textLight,
  },
  textEditor: {},
  media: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    padding: scale(12),
    paddingHorizontal: scale(18),
    borderRadius: theme.spacing.radius.xl,
    borderCurve: 'continuous',
    borderColor: theme.palette.gray,
  },
  mediaIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(15),
  },
  addImageText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.palette.text,
  },
  imageIcon: {
    borderRadius: theme.spacing.radius.md,
  },
  file: {
    height: scale(50),
    width: '100%',
  },
});
