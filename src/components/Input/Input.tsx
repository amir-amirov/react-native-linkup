import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import theme from '../../theme';
import {scale} from '../../utils';

const Input = ({containerStyles, icon, inputRef, ...props}: any) => {
  return (
    <View style={[styles.container, containerStyles && containerStyles]}>
      {icon && icon}
      <TextInput
        style={{flex: 1}}
        placeholderTextColor={theme.palette.textLight}
        ref={inputRef && inputRef}
        autoCapitalize={'none'}
        selectionColor={theme.palette.black}
        cursorColor={theme.palette.black}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: scale(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.4,
    borderColor: theme.palette.text,
    borderRadius: theme.spacing.radius.xxl,
    borderCurve: 'continuous',
    paddingHorizontal: scale(18),
    gap: scale(12),
  },
});
