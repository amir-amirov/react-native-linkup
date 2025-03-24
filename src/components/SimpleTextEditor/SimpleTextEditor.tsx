import React from 'react';
import theme from '../../theme';
import {styles} from './styles';
import {TextInput} from 'react-native';

const SimpleTextEditor = ({value, setValue, editable}: any) => {
  return (
    <TextInput
      multiline
      placeholder="What's on your mind?"
      placeholderTextColor={theme.palette.textLight}
      onChangeText={setValue}
      value={value}
      editable
      autoFocus
      selectionColor={theme.palette.primary}
      style={styles.input}
    />
  );
};

export default SimpleTextEditor;
