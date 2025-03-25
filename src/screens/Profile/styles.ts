import {StyleSheet} from 'react-native';
import {scale} from '../../utils';
import theme from '../../theme';

export const styles = StyleSheet.create({
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
