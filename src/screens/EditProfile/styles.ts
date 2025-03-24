import {StyleSheet} from 'react-native';
import {scale} from '../../utils';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  inputView: {
    gap: scale(5),
  },
  error: {
    color: theme.palette.rose,
    fontSize: 12,
    marginLeft: scale(15),
  },
});
