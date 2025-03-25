import {Platform, StyleSheet, TouchableHighlight, View} from 'react-native';
import React, {use} from 'react';
import Header from '../Header/Header';
import Icon from '../Icon/Icon';
import theme from '../../theme';
import {scale} from '../../utils';
import {useTranslation} from 'react-i18next';

interface Props {
  handleLogout: () => void;
  showLogout?: boolean;
}

const ProfileHeader: React.FC<Props> = ({handleLogout, showLogout = true}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Header title={t('profile')} showBackButton={true} />
      {showLogout && (
        <TouchableHighlight
          underlayColor={'#fedede'}
          activeOpacity={0.6}
          style={styles.logoutButton}
          onPress={() => handleLogout()}>
          <Icon name="logout" color={theme.palette.rose} />
        </TouchableHighlight>
      )}
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // marginBottom: scale(30),
    padding: 0,
  },
  logoutButton: {
    position: 'absolute',
    // top: 0,
    right: 0,
    bottom: Platform.OS === 'ios' ? undefined : 0,
    padding: scale(5),
    marginTop: scale(5),
    marginBottom: scale(10),
    borderRadius: theme.spacing.radius.sm,
    backgroundColor: '#fee2e2',
  },
});
