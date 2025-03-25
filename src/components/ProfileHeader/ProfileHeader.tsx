import {TouchableHighlight, View} from 'react-native';
import React from 'react';
import Header from '../Header/Header';
import Icon from '../Icon/Icon';
import theme from '../../theme';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';

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
