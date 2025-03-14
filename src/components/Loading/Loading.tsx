import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import theme from '../../theme';

interface Props {
  size?: 'large' | 'small';
  color?: string;
}

const Loading: React.FC<Props> = ({
  size = 'large',
  color = theme.palette.primary,
}) => {
  return <ActivityIndicator size={size} color={color} />;
};

export default Loading;

const styles = StyleSheet.create({});
