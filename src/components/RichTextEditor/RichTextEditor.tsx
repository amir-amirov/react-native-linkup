import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from '../../utils';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import theme from '../../theme';
import {useTranslation} from 'react-i18next';

const RichTextEditor = ({editorRef, onChange}: any) => {
  const {t} = useTranslation();
  return (
    <View style={{minHeight: scale(285)}}>
      <RichToolbar
        actions={[
          actions.setStrikethrough,
          actions.removeFormat,
          actions.setBold,
          actions.setItalic,
          actions.insertOrderedList,
          actions.blockquote,
          actions.alignLeft,
          actions.alignCenter,
          actions.alignRight,
          actions.code,
          actions.line,
          actions.heading1,
          actions.heading4,
        ]}
        iconMap={{
          [actions.heading1]: ({tintColor}: {tintColor: string}) => (
            <Text style={{color: tintColor}}>H1</Text>
          ),
          [actions.heading4]: ({tintColor}: {tintColor: string}) => (
            <Text style={{color: tintColor}}>H4</Text>
          ),
        }}
        style={styles.richBar}
        flatContainerStyle={styles.listStyle}
        selectedIconTint={theme.palette.primaryDark}
        editor={editorRef}
        disabled={false}
      />
      <RichEditor
        ref={editorRef}
        containerStyle={styles.rich}
        editorStyle={{
          ...styles.contentStyle,
          caretColor: theme.palette.primary,
        }}
        placeholder={t('text_editor_placeholder')}
        onChange={onChange}
        initialFocus={true}
      />
    </View>
  );
};

export default RichTextEditor;

const styles = StyleSheet.create({
  richBar: {
    borderTopRightRadius: theme.spacing.radius.xl,
    borderTopLeftRadius: theme.spacing.radius.xl,
    backgroundColor: theme.palette.gray,
  },
  listStyle: {
    paddingHorizontal: scale(8),
    gap: scale(3),
  },
  rich: {
    minHeight: scale(240),
    flex: 1,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderBottomRightRadius: theme.spacing.radius.xl,
    borderBottomLeftRadius: theme.spacing.radius.xl,
    borderColor: theme.palette.gray,
    padding: scale(5),
  },
  contentStyle: {
    color: theme.palette.textDark,
    // placeholderColor: "gray"
  },
});
