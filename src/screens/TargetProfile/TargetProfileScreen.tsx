import {View, Text, StatusBar, ScrollView, FlatList} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import {scale} from '../../utils';
import theme from '../../theme';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import baseService from '../../services/axios/baseService';
import Avatar from '../../components/Avatar/Avatar';
import Icon from '../../components/Icon/Icon';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import PostCard from '../../components/PostCard/PostCard';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';

const TargetProfileScreen = () => {
  const {t} = useTranslation();
  const route = useRoute<any>();

  const {userId} = route.params;
  const navigation = useNavigation<any>();

  const {
    data: user,
    isLoading: isFetchingUser,
    isError,
    error: userError,
  } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => baseService.get(`/users/${userId}`),
  });

  const fetchPosts = async ({pageParam = 1}) => {
    const response = await baseService.get(
      `/posts/${userId}?page=${pageParam}&limit=10`,
    );
    return response.data;
  };

  const {
    data,
    status,
    error,
    isFetchingNextPage,
    fetchNextPage,
    isFetching: isFetchingPosts,
  } = useInfiniteQuery({
    queryKey: ['posts', userId],
    queryFn: fetchPosts,
    initialPageParam: 1, // Specify the initial page parameter
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.length === 10 ? pages.length + 1 : undefined; // If we got 10 posts, fetch next page
    },
  });

  const posts = data?.pages.map(page => page.data).flat();

  if (isFetchingPosts || isFetchingUser) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Loading />
      </View>
    );
  }

  if (status === 'error' || isError) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Error: {error?.message}</Text>
      </View>
    );
  }

  return (
    <ScreenWrapper bgView={theme.palette.white}>
      <StatusBar
        backgroundColor={theme.palette.black}
        barStyle={'dark-content'}
      />
      <View style={{flex: 1, paddingHorizontal: scale(20)}}>
        <ProfileHeader handleLogout={() => {}} showLogout={false} />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={{gap: scale(15)}}>
              {/* Avatar container */}
              <View style={styles.avatarContainer}>
                <Avatar
                  uri={user ? user.data.user.image : null}
                  size={scale(110)}
                  rounded={theme.spacing.radius.xxl * 1.4}
                />
              </View>

              {/* User's details */}
              <View style={{alignItems: 'center', gap: scale(4)}}>
                <Text style={styles.userName}>
                  {user && user.data.user.name}
                </Text>
                <Text style={styles.infoText}>
                  {user && user.data.user.location}
                </Text>
              </View>

              {/* Email, phone, bio */}
              <View style={{gap: scale(10)}}>
                <View style={styles.info}>
                  <Icon
                    name="mail"
                    size={scale(20)}
                    color={theme.palette.textLight}
                  />
                  <Text style={styles.infoText}>
                    {user && user.data.user.email}
                  </Text>
                </View>
                {user && user.data.user.phoneNumber && (
                  <View style={styles.info}>
                    <Icon
                      name="call"
                      size={scale(20)}
                      color={theme.palette.textLight}
                    />
                    <Text style={styles.infoText}>
                      {user && user.data.user.phoneNumber}
                    </Text>
                  </View>
                )}
                {user && user.data.user.bio && (
                  <Text style={styles.infoText}>
                    {user && user.data.user.bio}
                  </Text>
                )}
              </View>
            </View>
            {!isFetchingPosts && posts && posts.length > 0 ? (
              <FlatList
                data={posts}
                contentContainerStyle={styles.listStyle}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <PostCard
                    item={item}
                    onPress={() =>
                      navigation.navigate('PostDetails', {post: item})
                    }
                  />
                )}
                onEndReached={() => {
                  fetchNextPage();
                }}
                onEndReachedThreshold={0.01}
                ListFooterComponent={
                  isFetchingNextPage ? (
                    <View
                      style={{
                        height: scale(55),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Loading />
                    </View>
                  ) : null
                }
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.noPosts}>{t('no_posts')}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default TargetProfileScreen;
