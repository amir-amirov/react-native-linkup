import {StyleSheet} from 'react-native';
import {scale} from '../../utils';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: scale(45),
    paddingHorizontal: scale(20),
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.palette.text,
  },
  form: {
    gap: scale(25),
  },
  inputLabel: {
    fontSize: 16,
    color: theme.palette.text,
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: '600',
    color: theme.palette.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(5),
  },
  footerText: {
    textAlign: 'center',
    color: theme.palette.text,
    fontSize: 16,
  },
  inputView: {
    gap: scale(5),
  },
  error: {
    color: theme.palette.rose,
    fontSize: 12,
    marginLeft: scale(15),
  },
});
