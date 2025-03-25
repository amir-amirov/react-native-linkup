import {StyleSheet} from 'react-native';
import {scale} from '../../utils';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: scale(15),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  list: {
    paddingHorizontal: scale(10),
  },
  sendIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: theme.palette.primary,
    borderRadius: theme.spacing.radius.lg,
    borderCurve: 'continuous',
    height: scale(55),
    width: scale(55),
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    fontSize: 16,
    color: theme.palette.text,
    fontWeight: '500',
  },
  loading: {
    height: scale(55),
    width: scale(55),
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{scale: 1.3}],
  },
});
