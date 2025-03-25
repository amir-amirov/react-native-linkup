import {StyleSheet, TouchableHighlight} from 'react-native';
import React from 'react';
import Icon from '../../Icon/Icon';
import {scale} from '../../../utils';
import theme from '../../../theme';

interface Props {
  size?: number;
  onPress: () => void;
}
const BackButton: React.FC<Props> = ({size = scale(26), onPress}) => {
  return (
    <TouchableHighlight
      underlayColor={'rgba(0,0,0,0.17)'}
      style={styles.button}
      onPress={() => onPress()}>
      <Icon
        name="arrowLeft"
        strokeWidth={scale(2.5)}
        size={size}
        color={theme.palette.text}
      />
    </TouchableHighlight>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.07)',
    borderRadius: theme.spacing.radius.sm,
  },
});
