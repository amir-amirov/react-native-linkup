import {StyleSheet} from 'react-native';
import React from 'react';
import {scale} from '../../utils';
import theme from '../../theme';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import {getUserImageSrc} from '../../utils/getUserImageSrc';

interface Props {
  uri: string | null;
  size?: number;
  rounded?: number;
  style?: ImageStyle;
}

const Avatar: React.FC<Props> = ({
  uri,
  size = scale(27),
  rounded = theme.spacing.radius.md,
  style = {},
}) => {
  return (
    <FastImage
      source={getUserImageSrc(uri)}
      style={[
        styles.avatar,
        {height: size, width: size, borderRadius: rounded},
        style,
      ]}
    />
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    borderCurve: 'continuous',
    borderColor: theme.palette.darkLight,
    borderWidth: 1,
  },
});
