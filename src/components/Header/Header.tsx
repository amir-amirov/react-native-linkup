import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from '../../utils';
import BackButton from '../Buttons/BackButton/BackButton';
import {useNavigation} from '@react-navigation/native';
import theme from '../../theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  return (
    <View
      style={[
        styles.container,
        {marginBottom: mb, marginTop: insets.top > 0 ? 0 : scale(10)},
      ]}>
      {showBackButton && (
        <View style={styles.showBackButton}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
      )}
      <Text style={styles.title}>{title || ''}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(5),
    gap: scale(10),
  },
  title: {
    marginTop: scale(5),
    fontSize: 24,
    fontWeight: '600',
    color: theme.palette.textDark,
  },
  showBackButton: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
