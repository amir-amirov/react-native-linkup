import {Alert, TouchableHighlight, View, Text} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import theme from '../../theme';
import Header from '../../components/Header/Header';
import {scale} from '../../utils';
import Avatar from '../../components/Avatar/Avatar';
import Icon from '../../components/Icon/Icon';
import {useUser} from '../../store/user';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/Input/Input';
import Button from '../../components/Buttons/Button/Button';
import {useRef, useState} from 'react';
import {openGallery} from '../../utils/openGallery';
import {uploadImageToFirebase} from '../../utils/uploadImageToFirebase';
import {Asset} from 'react-native-image-picker';
import {Controller, useForm} from 'react-hook-form';
import {ProfileFormData, profileSchema} from './scheme';
import {zodResolver} from '@hookform/resolvers/zod';
import {deleteFileFromFirebaseStorage} from '../../utils/deleteImageFromFirebase';
import {styles} from './styles';

const EditProfile = () => {
  const {user, isLoading, setUser, updateProfile} = useUser();
  const navigation = useNavigation();

  const [isLoadingToStorage, setLoadingToStorage] = useState(false);
  const [pickedImage, setPickedImage] = useState<Asset | undefined>();

  // This will store the link I upload to storage,
  // if problem arises storing it in backend,
  // i should delete this image using this url
  const uploadedImageUrl = useRef<string>('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? '',
      phoneNumber: user?.phoneNumber ?? '',
      location: user?.location ?? '',
      bio: user?.bio ?? '',
    },
  });

  const pickAvatar = async () => {
    const image = await openGallery(true);
    console.log('I picked', image);
    if (image != null) {
      setPickedImage(image);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setLoadingToStorage(true);

      if (pickedImage) {
        uploadedImageUrl.current = await uploadImageToFirebase(pickedImage);
      }

      if (
        data.name === user?.name &&
        data.phoneNumber === user.phoneNumber &&
        data.location === user.location &&
        data.bio === user.bio &&
        !pickedImage
      ) {
        Alert.alert('Sorry', "You didn't change anything..");
        return;
      }

      let updateProfileData;

      if (uploadedImageUrl.current) {
        updateProfileData = {
          id: user?.id,
          ...data,
          image: uploadedImageUrl.current,
        };
      } else {
        updateProfileData = {
          id: user?.id,
          ...data,
        };
      }
      const response = await updateProfile(updateProfileData);

      if (!!response) {
        setUser(response);
      }

      navigation.goBack();
    } catch (err: any) {
      Alert.alert(
        'Sorry',
        err.length > 0 && typeof err !== 'string' ? err[0] : err,
      );
      console.log('Update profile error: ', err);
      if (uploadedImageUrl.current) {
        deleteFileFromFirebaseStorage(uploadedImageUrl.current);
      }
    } finally {
      setLoadingToStorage(false);
      uploadedImageUrl.current = '';
    }
  };

  return (
    <ScreenWrapper bgView={theme.palette.white}>
      <View style={{flex: 1, paddingHorizontal: scale(20)}}>
        <Header title="Edit Profile" mb={scale(30)} showBackButton={true} />

        <View style={styles.container}>
          <View style={{gap: scale(15)}}>
            {/* Avatar container */}
            <View style={styles.avatarContainer}>
              <Avatar
                uri={
                  pickedImage?.uri ? pickedImage.uri : user ? user.image : null
                }
                size={scale(110)}
                rounded={theme.spacing.radius.xxl * 1.4}
              />
              <TouchableHighlight
                style={styles.editIcon}
                underlayColor={theme.palette.gray}
                onPress={() => pickAvatar()}>
                <Icon name="camera" strokeWidth={2.5} size={scale(20)} />
              </TouchableHighlight>
            </View>

            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: theme.palette.textLight,
              }}>
              Please fill your profile details
            </Text>

            <View style={styles.inputView}>
              <Controller
                control={control}
                name="name"
                render={({field: {onChange, value}}) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    icon={
                      <Icon
                        name="user"
                        size={scale(26)}
                        strokeWidth={scale(1.6)}
                      />
                    }
                    placeholder={'Enter your name..'}
                    autoCorrect={false}
                    dataDetectorTypes="none"
                    autoCapitalize="words"
                    editable={!isLoading || !isLoadingToStorage}
                  />
                )}
              />
              {errors.name && (
                <Text style={styles.error}>{errors.name.message}</Text>
              )}
            </View>
            <View style={styles.inputView}>
              <Controller
                control={control}
                name="phoneNumber"
                render={({field: {onChange, value}}) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    icon={
                      <Icon
                        name="call"
                        size={scale(26)}
                        strokeWidth={scale(1.6)}
                      />
                    }
                    placeholder={'Enter your phone..'}
                    autoCorrect={false}
                    dataDetectorTypes="none"
                    editable={!isLoading || !isLoadingToStorage}
                  />
                )}
              />
              {errors.phoneNumber && (
                <Text style={styles.error}>{errors.phoneNumber.message}</Text>
              )}
            </View>
            <View style={styles.inputView}>
              <Controller
                control={control}
                name="location"
                render={({field: {onChange, value}}) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    icon={
                      <Icon
                        name="location"
                        size={scale(26)}
                        strokeWidth={scale(1.6)}
                      />
                    }
                    placeholder={'Enter your location..'}
                    autoCorrect={false}
                    dataDetectorTypes="none"
                    editable={!isLoading || !isLoadingToStorage}
                  />
                )}
              />
              {errors.location && (
                <Text style={styles.error}>{errors.location.message}</Text>
              )}
            </View>
            <View style={styles.inputView}>
              <Controller
                control={control}
                name="bio"
                render={({field: {onChange, value}}) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    placeholder={'Tell about yourself..'}
                    autoCorrect={false}
                    dataDetectorTypes="none"
                    editable={!isLoading || !isLoadingToStorage}
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical="top"
                    containerStyles={{
                      padding: scale(10),
                      alignItems: 'flex-start',
                      height: scale(100),
                    }}
                  />
                )}
              />
              {errors.bio && (
                <Text style={styles.error}>{errors.bio.message}</Text>
              )}
            </View>
            <Button
              title="Update"
              loading={isLoading || isLoadingToStorage}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default EditProfile;
