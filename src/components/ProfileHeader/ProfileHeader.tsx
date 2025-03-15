import {StyleSheet, TouchableHighlight, View} from 'react-native';
import React from 'react';
import Header from '../Header/Header';
import Icon from '../Icon/Icon';
import theme from '../../theme';
import {scale} from '../../utils';

interface Props {
  handleLogout: () => void;
}

const ProfileHeader: React.FC<Props> = ({handleLogout}) => {
  return (
    <View style={styles.container}>
      <Header title="Profile" showBackButton={true} />
      <TouchableHighlight
        underlayColor={'#fedede'}
        activeOpacity={0.6}
        style={styles.logoutButton}
        onPress={() => handleLogout()}>
        <Icon name="logout" color={theme.palette.rose} />
      </TouchableHighlight>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {justifyContent: 'center'},
  logoutButton: {
    position: 'absolute',
    right: 0,
    padding: scale(5),
    borderRadius: theme.spacing.radius.sm,
    backgroundColor: '#fee2e2',
  },
});
