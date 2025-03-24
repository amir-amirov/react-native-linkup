import {StyleSheet} from 'react-native';
import {scale} from '../../utils';
import theme from '../../theme';

export const styles = StyleSheet.create({
  input: {
    minHeight: scale(240),
    flex: 1,
    borderWidth: 1.5,
    borderRadius: theme.spacing.radius.xl,
    borderColor: theme.palette.gray,
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
    color: theme.palette.textDark,
    textAlignVertical: 'top',
  },
});
