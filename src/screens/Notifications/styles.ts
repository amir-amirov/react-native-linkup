import {StyleSheet} from 'react-native';
import {scale} from '../../utils';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(15),
  },
  listStyle: {
    paddingVertical: scale(20),
    gap: scale(10),
  },
  noData: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.palette.text,
    textAlign: 'center',
  },
});
