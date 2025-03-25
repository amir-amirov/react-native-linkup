import {StyleSheet} from 'react-native';
import {scale} from '../../utils';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
    gap: scale(20),
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.palette.text,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.palette.text,
  },
  avatar: {
    height: scale(70),
    width: scale(70),
    borderRadius: theme.spacing.radius.xl,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  publicText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.palette.textLight,
  },
  textEditor: {},
  media: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    padding: scale(12),
    paddingHorizontal: scale(18),
    borderRadius: theme.spacing.radius.xl,
    borderCurve: 'continuous',
    borderColor: theme.palette.gray,
  },
  mediaIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(15),
  },
  addImageText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.palette.text,
  },
  imageIcon: {
    borderRadius: theme.spacing.radius.md,
  },
  file: {
    height: scale(250),
    width: '100%',
    borderRadius: theme.spacing.radius.xl,
    overflow: 'hidden',
    borderCurve: 'continuous',
  },
  video: {},
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: scale(7),
    borderRadius: scale(50),
    backgroundColor: 'rgba(255,0,0,0.6)',
  },
});
