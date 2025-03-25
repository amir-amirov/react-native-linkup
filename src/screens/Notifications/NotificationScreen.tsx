import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {use} from 'react';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import {useQuery} from '@tanstack/react-query';
import baseService from '../../services/axios/baseService';
import {useUser} from '../../store/user';
import NotificationItem from '../../components/NotificationItem/NotificationItem';
import {scale} from '../../utils';
import theme from '../../theme';
import Header from '../../components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const NotificationScreen = () => {
  const {t} = useTranslation();
  const {user} = useUser();
  const navigation = useNavigation<any>();

  const {
    data: notifications,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => baseService.get(`/notifications/${user?.id}`),
  });

  if (!isLoading) {
    console.log('Notifications: ', notifications);
  }

  const handlePress = (item: any) => {
    let post = item.post;

    navigation.navigate('PostDetails', {
      post: post,
      commentId: item.commentId,
    });
  };

  return (
    <ScreenWrapper bgView={theme.palette.background}>
      <StatusBar
        backgroundColor={theme.palette.black}
        barStyle={'dark-content'}
      />
      <View style={styles.container}>
        <Header title={t('notifications')} showBackButton={true} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listStyle}>
          {notifications?.data.map((item: any) => {
            return (
              <NotificationItem
                key={item?.id}
                item={item}
                onPress={() => handlePress(item)}
              />
            );
          })}

          {notifications?.data.length === 0 && (
            <Text style={styles.noData}>{t('no_notifications')}</Text>
          )}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(15),
  },
  listStyle: {
    paddingVertical: scale(20),
    gap: scale(10),
  },
  noData: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.palette.text,
    textAlign: 'center',
  },
});
