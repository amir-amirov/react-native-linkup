import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import Icon from '../../components/Icon/Icon';
import {scale} from '../../utils';
import theme from '../../theme';
import {useNavigation} from '@react-navigation/native';
import Avatar from '../../components/Avatar/Avatar';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <ScreenWrapper bgView={theme.palette.white}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>LinkUp</Text>

          <View style={styles.icons}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Notifications')}>
              <Icon
                name="heart"
                size={scale(27)}
                strokeWidth={scale(2)}
                color={theme.palette.text}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('NewPost')}>
              <Icon
                name="plus"
                size={scale(27)}
                strokeWidth={scale(2)}
                color={theme.palette.text}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Profile')}>
              {/* <Icon
                name="user"
                size={scale(27)}
                strokeWidth={scale(2)}
                color={theme.palette.text}
              /> */}
              <Avatar
                uri={''}
                size={scale(35)}
                rounded={theme.spacing.radius.sm}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(20),
    marginBottom: scale(10),
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: theme.palette.text,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(18),
  },
});
