import {StyleSheet} from 'react-native';
import {scale} from '../../utils';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: scale(7),
  },
  content: {
    backgroundColor: 'rgba(0,0,0,0.06)',
    flex: 1,
    gap: scale(5),
    paddingHorizontal: scale(14),
    paddingVertical: scale(10),
    borderRadius: theme.spacing.radius.md,
    borderCurve: 'continuous',
  },
  highlight: {
    borderWidth: 0.2,
    backgroundColor: 'white',
    borderColor: theme.palette.dark,
    shadowColor: theme.palette.dark,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(3),
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.palette.textDark,
  },
});
