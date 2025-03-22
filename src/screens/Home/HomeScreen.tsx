import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import Icon from '../../components/Icon/Icon';
import {scale} from '../../utils';
import theme from '../../theme';
import {useNavigation} from '@react-navigation/native';
import Avatar from '../../components/Avatar/Avatar';
import {useUser} from '../../store/user';
import PostCard from '../../components/PostCard/PostCard';
import {useInfiniteQuery} from '@tanstack/react-query';
import baseService from '../../services/axios/baseService';
import Loading from '../../components/Loading/Loading';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const {user} = useUser();

  const fetchPosts = async ({pageParam = 1}) => {
    const response = await baseService.get(`/posts?page=${pageParam}&limit=10`);
    return response.data;
  };

  const {data, status, error, isFetchingNextPage, fetchNextPage, isFetching} =
    useInfiniteQuery({
      queryKey: ['posts'],
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
        <Text>Loading..</Text>
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

  // const posts: any = [
  //   {
  //     id: 21,
  //     body: 'Test1234',
  //     file: '',
  //     user_id: 1,
  //     user_name: 'Amir Amirov',
  //     user_image:
  //       'https://firebasestorage.googleapis.com/v0/b/auth-2c46a.appspot.com/o/images%2F17423208391282FC6B89D-8E91-48FA-B104-E0A80B94DAB5.jpg?alt=media&token=451e6f3a-cb76-49cb-b9bf-3c78cfe0b584',
  //     likesCount: 0,
  //     likedByMe: false,
  //     created_at: '2025-03-17T20:16:06.880Z',
  //     updated_at: '2025-03-17T20:16:06.880Z',
  //   },
  //   {
  //     id: 22,
  //     body: '<div style="text-align: center;"><b>123</b></div>',
  //     file: 'https://firebasestorage.googleapis.com/v0/b/auth-2c46a.appspot.com/o/linkup-image%2F17423309757564FEEA8F4-71D7-4761-BB2A-8AA03DBA16F9.jpg?alt=media&token=1def4773-3ecf-4ed8-879e-9f64b7c3878f',
  //     user_id: 1,
  //     user_name: 'Amir Amirov',
  //     user_image:
  //       'https://firebasestorage.googleapis.com/v0/b/auth-2c46a.appspot.com/o/images%2F17423208391282FC6B89D-8E91-48FA-B104-E0A80B94DAB5.jpg?alt=media&token=451e6f3a-cb76-49cb-b9bf-3c78cfe0b584',
  //     likesCount: 0,
  //     likedByMe: false,
  //     created_at: '2025-03-18T20:49:40.425Z',
  //     updated_at: '2025-03-18T20:49:40.425Z',
  //   },
  //   {
  //     id: 23,
  //     body: '<div>My name is Amir Amirov and I am building mobile application with React Native!</div>',
  //     file: 'https://firebasestorage.googleapis.com/v0/b/auth-2c46a.appspot.com/o/linkup-image%2F1742331153857FD4C931E-49F0-43CC-BF0C-26075A045F76.jpg?alt=media&token=80cd5a60-3c93-4167-8d0f-a5fd4adb5135',
  //     user_id: 1,
  //     user_name: 'Amir Amirov',
  //     user_image:
  //       'https://firebasestorage.googleapis.com/v0/b/auth-2c46a.appspot.com/o/images%2F17423208391282FC6B89D-8E91-48FA-B104-E0A80B94DAB5.jpg?alt=media&token=451e6f3a-cb76-49cb-b9bf-3c78cfe0b584',
  //     likesCount: 0,
  //     likedByMe: false,
  //     created_at: '2025-03-18T20:52:37.879Z',
  //     updated_at: '2025-03-18T20:52:37.879Z',
  //   },
  //   {
  //     id: 24,
  //     body: '<div style="text-align: left;"><b><i>This is fake! Earth is flat!!!</i></b></div>',
  //     file: 'https://firebasestorage.googleapis.com/v0/b/auth-2c46a.appspot.com/o/linkup-video%2F1742335972067video-test-61C9AEC3-7F94-4971-9114-20BB4A28BFA7.mov?alt=media&token=500c4bb7-553c-4701-8872-7a0518794bbf',
  //     user_id: 1,
  //     user_name: 'Amir Amirov',
  //     user_image:
  //       'https://firebasestorage.googleapis.com/v0/b/auth-2c46a.appspot.com/o/images%2F17423208391282FC6B89D-8E91-48FA-B104-E0A80B94DAB5.jpg?alt=media&token=451e6f3a-cb76-49cb-b9bf-3c78cfe0b584',
  //     likesCount: 0,
  //     likedByMe: false,
  //     created_at: '2025-03-18T22:12:55.864Z',
  //     updated_at: '2025-03-18T22:12:55.864Z',
  //   },
  // ];

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
                uri={user ? user?.image : ''}
                size={scale(35)}
                rounded={theme.spacing.radius.sm}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Posts */}
        <FlatList
          data={posts}
          contentContainerStyle={styles.listStyle}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <PostCard
              item={item}
              onPress={() => navigation.navigate('PostDetails', {post: item})}
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
  listStyle: {
    paddingHorizontal: scale(15),
    paddingTop: scale(15),
  },
});
