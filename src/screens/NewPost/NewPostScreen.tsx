import {
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
import {openGallery} from '../../utils/openGallery';
import {getFileType} from '../../utils/getFileType';
import {Asset} from 'react-native-image-picker';
import Video from 'react-native-video';
import {uploadImageToFirebase} from '../../utils/uploadImageToFirebase';
import useCreatePostMutation from '../../services/ReactQuery/useCreatePostMutation';
import SimpleTextEditor from '../../components/SimpleTextEditor/SimpleTextEditor';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';

const NewPostScreen = () => {
  const {t} = useTranslation();
  const {user} = useUser();

  const mutation = useCreatePostMutation();

  const [postBody, setPostBody] = useState('');
  const bodyRef = useRef('');
  const editorRef = useRef('');
  const scrollViewRef = useRef<ScrollView>(null);

  const navigation = useNavigation<any>();
  const [isUploadingToStorage, setUploadingToStorage] = useState(false);
  const [file, setFile] = useState<Asset | null>(null);

  const onPick = async (isImage: boolean) => {
    const media = await openGallery(isImage);
    if (media != null) {
      setFile(media);
    }
  };

  const onSubmit = async () => {
    try {
      if (!postBody && !file) {
        Alert.alert(t('post'), t('create_post_validation'));
        return;
      }

      console.log('I wrote: ', postBody);
      let imageUrl: string = '';
      if (file) {
        setUploadingToStorage(true);
        imageUrl = await uploadImageToFirebase(file);
      }

      let data = {
        body: postBody,
        file: imageUrl,
      };

      mutation.mutate(data, {
        onSuccess: () => {
          navigation.navigate('Home');
        },
      });
    } catch (err: any) {
      console.log('Error: ', err);
      Alert.alert('Error', err.message);
    } finally {
      setUploadingToStorage(false);
    }
  };

  useEffect(() => {
    if (file && scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [file]);

  return (
    <ScreenWrapper bgView={theme.palette.white}>
      <View style={styles.container}>
        <Header title={t('create_post')} showBackButton={true} mb={0} />
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{gap: scale(20)}}
          showsVerticalScrollIndicator={false}>
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
            {Platform.OS == 'ios' ? (
              <RichTextEditor
                editorRef={editorRef}
                onChange={(body: any) => setPostBody(body)}
                editable={!isUploadingToStorage && !mutation.isPending}
              />
            ) : (
              <SimpleTextEditor
                value={postBody}
                setValue={setPostBody}
                editable={!isUploadingToStorage && !mutation.isPending}
              />
            )}
          </View>

          {file && (
            <View style={styles.file}>
              {getFileType(file) === 'video' ? (
                <Video
                  source={{uri: file.uri}}
                  resizeMode="cover"
                  style={{flex: 1}}
                  controls={true}
                />
              ) : (
                <Image
                  source={{uri: file.uri}}
                  resizeMode="cover"
                  style={{flex: 1}}
                />
              )}

              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.closeIcon}
                onPress={() => setFile(null)}
                disabled={isUploadingToStorage || mutation.isPending}>
                <Icon
                  name="delete"
                  size={scale(20)}
                  color={theme.palette.white}
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.media}>
            <Text style={styles.addImageText}>{t('add_to_post')}</Text>
            <View style={styles.mediaIcons}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => onPick(true)}
                disabled={isUploadingToStorage || mutation.isPending}>
                <Icon
                  name="image"
                  size={scale(30)}
                  color={theme.palette.dark}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => onPick(false)}
                disabled={isUploadingToStorage || mutation.isPending}>
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
          title={t('post')}
          loading={isUploadingToStorage || mutation.isPending}
          onPress={() => onSubmit()}
        />
      </View>
    </ScreenWrapper>
  );
};

export default NewPostScreen;
