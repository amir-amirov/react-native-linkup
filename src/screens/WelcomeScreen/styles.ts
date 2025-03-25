import {StyleSheet} from 'react-native';
import theme from '../../theme';
import {scale} from '../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.palette.white,
    paddingHorizontal: scale(30),
  },
  welcomeImage: {
    height: scale(300),
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    color: theme.palette.text,
    fontSize: scale(36),
    fontWeight: '800',
    textAlign: 'center',
  },
  punchline: {
    color: theme.palette.text,
    fontSize: scale(16),
    textAlign: 'center',
    paddingHorizontal: scale(15),
  },
  footer: {
    gap: scale(20),
    width: '100%',
  },
  btn: {
    marginHorizontal: scale(0),
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(5),
  },
  loginText: {
    textAlign: 'center',
    color: theme.palette.text,
    fontSize: scale(15),
  },
});
