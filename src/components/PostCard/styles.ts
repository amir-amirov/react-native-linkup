import {StyleSheet} from 'react-native';
import {scale} from '../../utils';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    gap: scale(10),
    marginBottom: scale(15),
    borderRadius: theme.spacing.radius.xxl * 1.1,
    borderCurve: 'continuous',
    padding: scale(10),
    paddingVertical: scale(12),
    backgroundColor: theme.palette.white,
    borderWidth: 0.5,
    borderColor: theme.palette.gray,
    overflow: 'hidden',
    shadowColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  username: {
    fontSize: 16,
    color: theme.palette.textDark,
    fontWeight: '600',
  },
  postTime: {
    fontSize: 14,
    color: theme.palette.textLight,
    fontWeight: '500',
  },
  content: {
    gap: scale(10),
  },
  postMedia: {
    height: scale(250),
    width: '100%',
    borderRadius: theme.spacing.radius.xl,
    borderCurve: 'continuous',
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
  },
  postBody: {
    marginLeft: scale(5),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  footerButton: {
    marginLeft: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(18),
  },
  count: {
    color: theme.palette.text,
    fontSize: 16,
  },
  shadowStyles: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    // elevation: 1,
  },
});
