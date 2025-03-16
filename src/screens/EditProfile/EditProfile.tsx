import {Alert, StyleSheet, TouchableHighlight, View, Text} from 'react-native';
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
import {useRef} from 'react';

const EditProfile = () => {
  const {user, isLoading, setUser, updateProfile} = useUser();
  const navigation = useNavigation();

  const nameRef = useRef('');
  const phoneRef = useRef('');
  const locationRef = useRef('');
  const bioRef = useRef('');

  const handleUpdate = async () => {
    try {
      console.log('I am sending: ', {
        id: user?.id,
        name: nameRef.current,
        phoneNumber: phoneRef.current,
        location: locationRef.current,
        bio: bioRef.current,
      });
      const response = await updateProfile({
        id: user?.id,
        name: nameRef.current,
        phoneNumber: phoneRef.current,
        location: locationRef.current,
        bio: bioRef.current,
      });

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
                uri={user ? user.image : null}
                size={scale(110)}
                rounded={theme.spacing.radius.xxl * 1.4}
              />
              <TouchableHighlight
                style={styles.editIcon}
                underlayColor={theme.palette.gray}
                onPress={() => {}}>
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

            <Input
              onChangeText={(value: string) => {
                nameRef.current = value;
              }}
              defaultValue={user && user.name ? user.name : ''}
              icon={
                <Icon name="user" size={scale(26)} strokeWidth={scale(1.6)} />
              }
              placeholder={'Enter your name..'}
              autoCorrect={false}
              dataDetectorTypes="none"
              autoCapitalize="words"
              editable={!isLoading}
            />
            <Input
              onChangeText={(value: string) => {
                phoneRef.current = value;
              }}
              defaultValue={user && user.phoneNumber ? user.phoneNumber : ''}
              icon={
                <Icon name="call" size={scale(26)} strokeWidth={scale(1.6)} />
              }
              placeholder={'Enter your phone..'}
              autoCorrect={false}
              dataDetectorTypes="none"
              editable={!isLoading}
            />
            <Input
              onChangeText={(value: string) => {
                locationRef.current = value;
              }}
              defaultValue={user && user.location ? user.location : ''}
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
              editable={!isLoading}
            />
            <Input
              onChangeText={(value: string) => {
                bioRef.current = value;
              }}
              defaultValue={user && user.bio ? user.bio : ''}
              placeholder={'Tell about yourself..'}
              autoCorrect={false}
              dataDetectorTypes="none"
              editable={!isLoading}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              containerStyles={{
                padding: scale(10),
                alignItems: 'flex-start',
                height: scale(100),
              }}
            />
            <Button
              title="Update"
              loading={isLoading}
              onPress={() => handleUpdate()}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    height: scale(110),
    width: scale(110),
    alignSelf: 'center',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -12,
    padding: scale(7),
    borderRadius: scale(50),
    backgroundColor: theme.palette.white,
    shadowColor: theme.palette.textLight,
    shadowOffset: {width: 0, height: scale(4)},
    shadowOpacity: 0.4,
    shadowRadius: scale(5),
    elevation: 7,
  },
});
