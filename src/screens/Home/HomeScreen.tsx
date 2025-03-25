import {FlatList, StatusBar, Text, TouchableOpacity, View} from 'react-native';
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
import {styles} from './styles';

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

  return (
    <ScreenWrapper bgView={theme.palette.white}>
      <StatusBar
        backgroundColor={theme.palette.white}
        barStyle={'dark-content'}
      />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Stratum</Text>

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
