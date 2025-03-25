import {Platform, StyleSheet} from 'react-native';
import {scale} from '../../utils';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(5),
    gap: scale(10),
  },
  title: {
    marginTop: scale(5),
    fontSize: 24,
    fontWeight: '600',
    color: theme.palette.textDark,
  },
  showBackButton: {
    position: 'absolute',
    left: 0,
    // top: 0,
    bottom: Platform.OS === 'ios' ? undefined : 0,
  },
});
