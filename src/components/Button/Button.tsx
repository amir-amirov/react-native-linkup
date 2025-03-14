import {
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import theme from '../../theme';
import {scale} from '../../utils';
import Loading from '../Loading/Loading';

interface Props {
  buttonStyle: any;
  textStyle?: any;
  title: string;
  onPress: () => void;
  loading?: boolean;
  hasShadow?: boolean;
}

const Button: React.FC<Props> = ({
  buttonStyle,
  textStyle,
  title = '',
  onPress = () => {},
  loading = false,
  hasShadow = true,
}) => {
  if (loading) {
    return (
      <View style={[styles.button, buttonStyle, {backgroundColor: 'white'}]}>
        <Loading />
      </View>
    );
  }
  return (
    <TouchableHighlight
      underlayColor={theme.palette.primaryDark}
      onPress={onPress}
      style={[styles.button, buttonStyle, hasShadow && styles.shadowStyle]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableHighlight>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.palette.primary,
    height: scale(55),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing.radius.xl,
    overflow: 'hidden',
  },
  text: {
    fontSize: 22,
    color: theme.palette.white,
    fontWeight: '700',
  },
  // not working with TouchableHighlight
  shadowStyle: {
    shadowColor: theme.palette.dark,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    // elevation: 4,
  },
});
