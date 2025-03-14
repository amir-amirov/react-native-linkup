import {StyleSheet, Text} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import theme from '../../theme';
import Icon from '../../assets/icons';

const LoginScreen = () => {
  return (
    <ScreenWrapper bgView={theme.palette.white}>
      <Text>LoginScreen</Text>
      <Icon name="home" color="red" />
    </ScreenWrapper>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
