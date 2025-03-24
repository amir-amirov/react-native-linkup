import {
  Alert,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  StatusBar,
} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import {scale} from '../../utils';
import theme from '../../theme';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import {useNavigation} from '@react-navigation/native';
import {useUser} from '../../store/user';
import {handleLogout} from '../../services/axios/baseService';
import Avatar from '../../components/Avatar/Avatar';
import Icon from '../../components/Icon/Icon';

const ProfileScreen = () => {
  const {user} = useUser();
  const navigation = useNavigation<any>();

  const logout = () => {
    Alert.alert('Confirm', 'Are you sure you want to log out?', [
      {
        text: 'Logout',
        onPress: handleLogout,
        style: 'destructive',
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Logout Cancelled'),
        style: 'cancel',
      },
    ]);
  };

  return (
    <ScreenWrapper bgView={theme.palette.white}>
      <StatusBar
        backgroundColor={theme.palette.black}
        barStyle={'dark-content'}
      />
      <View style={{flex: 1, paddingHorizontal: scale(20)}}>
        <ProfileHeader handleLogout={logout} />

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
                onPress={() => navigation.navigate('EditProfile')}>
                <Icon name="edit" strokeWidth={2.5} size={scale(20)} />
              </TouchableHighlight>
            </View>

            {/* User's details */}
            <View style={{alignItems: 'center', gap: scale(4)}}>
              <Text style={styles.userName}>{user && user.name}</Text>
              <Text style={styles.infoText}>{user && user.location}</Text>
            </View>

            {/* Email, phone, bio */}
            <View style={{gap: scale(10)}}>
              <View style={styles.info}>
                <Icon
                  name="mail"
                  size={scale(20)}
                  color={theme.palette.textLight}
                />
                <Text style={styles.infoText}>{user && user.email}</Text>
              </View>
              {user && user.phoneNumber && (
                <View style={styles.info}>
                  <Icon
                    name="call"
                    size={scale(20)}
                    color={theme.palette.textLight}
                  />
                  <Text style={styles.infoText}>
                    {user && user.phoneNumber}
                  </Text>
                </View>
              )}
              {user && user.bio && (
                <Text style={styles.infoText}>{user && user.bio}</Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: scale(15),
    marginBottom: scale(20),
  },
  headerShape: {
    width: '100%',
    height: '20%',
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
  userName: {
    fontSize: 27,
    fontWeight: '500',
    color: theme.palette.textDark,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.palette.textLight,
  },
  logoutButton: {
    position: 'absolute',
    right: 0,
  },
  listStyle: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(30),
  },
  noPosts: {
    fontSize: 16,
    textAlign: 'center',
    color: theme.palette.text,
  },
});
