import {Alert, StyleSheet, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import {scale} from '../../utils';
import theme from '../../theme';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import {useNavigation} from '@react-navigation/native';
import {useUser} from '../../store/user';
import {clearTokens} from '../../services/axios/baseService';

const ProfileScreen = () => {
  const {setIsAuth, removeUserDetails} = useUser();
  const navigation = useNavigation<any>();
  const handleLogout = () => {
    Alert.alert('Logout Confirmation', 'Are you sure you want to log out?', [
      {
        text: 'Yes',
        onPress: () => {
          console.log('Logging out...');
          removeUserDetails();
          clearTokens();
          setIsAuth(false);
        },
      },
      {
        text: 'No',
        onPress: () => console.log('Logout Cancelled'),
        // style: "cancel",
      },
    ]);
  };

  return (
    <ScreenWrapper bgView={theme.palette.white}>
      <View
        style={{flex: 1, paddingHorizontal: scale(20), position: 'relative'}}>
        <ProfileHeader handleLogout={handleLogout} />
      </View>
    </ScreenWrapper>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  logoutButton: {
    position: 'absolute',
    right: 0,
  },
});
