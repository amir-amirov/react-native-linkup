import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import theme from '../../theme';
import Header from '../../components/Header/Header';
import {scale} from '../../utils';
import Avatar from '../../components/Avatar/Avatar';
import {useUser} from '../../store/user';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';

const NewPostScreen = () => {
  const {user} = useUser();
  return (
    <ScreenWrapper bgView={theme.palette.white}>
      <View style={styles.container}>
        <Header title="Create Post" showBackButton={true} />
        <ScrollView contentContainerStyle={{gap: scale(20)}}>
          <View style={styles.header}>
            <Avatar
              uri={user ? user.image : null}
              size={scale(60)}
              rounded={theme.spacing.radius.xl}
            />
            <View style={{gap: scale(2)}}>
              <Text style={styles.username}>{user && user.name}</Text>
              <Text style={styles.publicText}>Public</Text>
            </View>
          </View>

          <View style={styles.textEditor}>
            <RichTextEditor />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(15),
    paddingTop: scale(10),
    gap: scale(20),
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.palette.text,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.palette.text,
  },
  avatar: {
    height: scale(70),
    width: scale(70),
    borderRadius: theme.spacing.radius.xl,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  publicText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.palette.textLight,
  },
  textEditor: {},
  media: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    padding: scale(12),
    paddingHorizontal: scale(18),
    borderRadius: theme.spacing.radius.xl,
    borderCurve: 'continuous',
    borderColor: theme.palette.gray,
  },
  mediaIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(15),
  },
});
