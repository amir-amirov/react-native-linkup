import {StyleSheet} from 'react-native';
import theme from '../../theme';
import {scale} from '../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.white,
    borderWidth: 0.5,
    borderColor: theme.palette.darkLight,
    padding: scale(15),
    borderRadius: theme.spacing.radius.xxl,
    borderCurve: 'continuous',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: scale(12),
  },
  nameTitle: {
    flex: 1,
    gap: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.palette.text,
  },
});
