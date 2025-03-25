import React from 'react';
import theme from '../../theme';
import {styles} from './styles';
import {TextInput} from 'react-native';
import {useTranslation} from 'react-i18next';

const SimpleTextEditor = ({value, setValue, editable}: any) => {
  const {t} = useTranslation();
  return (
    <TextInput
      multiline
      placeholder={t('text_editor_placeholder')}
      placeholderTextColor={theme.palette.textLight}
      onChangeText={setValue}
      value={value}
      editable={editable}
      autoFocus
      selectionColor={theme.palette.primary}
      style={styles.input}
    />
  );
};

export default SimpleTextEditor;
