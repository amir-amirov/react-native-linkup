import {
  Alert,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import {scale} from '../../utils';
import theme from '../../theme';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import {useNavigation} from '@react-navigation/native';
import {useUser} from '../../store/user';
import baseService, {handleLogout} from '../../services/axios/baseService';
import Avatar from '../../components/Avatar/Avatar';
import Icon from '../../components/Icon/Icon';
import {useInfiniteQuery} from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import PostCard from '../../components/PostCard/PostCard';
import {useTranslation} from 'react-i18next';

const ProfileScreen = () => {
  const {t} = useTranslation();
  const {user} = useUser();
  const navigation = useNavigation<any>();

  const fetchPosts = async ({pageParam = 1}) => {
    const response = await baseService.get(
      `/posts/${user?.id}?page=${pageParam}&limit=10`,
    );
    return response.data;
  };

  const {data, status, error, isFetchingNextPage, fetchNextPage, isFetching} =
    useInfiniteQuery({
      queryKey: ['posts', user?.id],
      queryFn: fetchPosts,
      initialPageParam: 1, // Specify the initial page parameter
      getNextPageParam: (lastPage, pages) => {
        return lastPage.data.length === 10 ? pages.length + 1 : undefined; // If we got 10 posts, fetch next page
      },
    });

  console.log('Data: ', data);
  console.log('Pages: ', data?.pages[0]);
  console.log('My posts: ', data?.pages[0].data);

  const posts = data?.pages.map(page => page.data).flat();

  if (isFetching) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Loading />
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const logout = () => {
    Alert.alert(t('confirm'), t('logout_question'), [
      {
        text: t('logout'),
        onPress: handleLogout,
        style: 'destructive',
      },
      {
        text: t('cancel'),
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
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
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
            {!isFetching && posts && posts.length > 0 ? (
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

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: scale(30),
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
    paddingHorizontal: scale(0),
    paddingVertical: scale(30),
  },
  noPosts: {
    fontSize: 16,
    textAlign: 'center',
    color: theme.palette.textLight,
  },
});
