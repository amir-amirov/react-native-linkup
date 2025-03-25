import {StyleSheet} from 'react-native';
import {scale} from '../../utils';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(20),
    marginVertical: scale(10),
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: theme.palette.text,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(18),
  },
  listStyle: {
    paddingHorizontal: scale(15),
    paddingTop: scale(15),
  },
});
