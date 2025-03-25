import {Platform, StyleSheet} from 'react-native';
import {scale} from '../../utils';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // marginBottom: scale(30),
    padding: 0,
  },
  logoutButton: {
    position: 'absolute',
    // top: 0,
    right: 0,
    bottom: Platform.OS === 'ios' ? undefined : 0,
    padding: scale(5),
    marginTop: scale(5),
    marginBottom: scale(10),
    borderRadius: theme.spacing.radius.sm,
    backgroundColor: '#fee2e2',
  },
});
