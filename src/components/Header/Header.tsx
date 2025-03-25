import {Text, View} from 'react-native';
import React from 'react';
import {scale} from '../../utils';
import BackButton from '../Buttons/BackButton/BackButton';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
import {styles} from './styles';

interface Props {
  title: string;
  showBackButton?: boolean;
  mb?: number;
}
const Header: React.FC<Props> = ({
  title,
  showBackButton = false,
  mb = scale(10),
}) => {
  const navigation = useNavigation<any>();
  return (
    <View style={[styles.container, {marginBottom: mb}]}>
      {showBackButton && (
        <View style={styles.showBackButton}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
      )}
      <Text
        style={[styles.title, Platform.OS === 'ios' ? {top: 0} : {bottom: 0}]}>
        {title || ''}
      </Text>
    </View>
  );
};

export default Header;
