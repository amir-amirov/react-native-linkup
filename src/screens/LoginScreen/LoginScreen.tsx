import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import theme from '../../theme';
import Home from '../../assets/icons/Home';

const LoginScreen = () => {
  return (
    <ScreenWrapper bgView={theme.palette.white}>
      <Text>LoginScreen</Text>
      <Home strokeWidth={2} color={theme.palette.rose} />
    </ScreenWrapper>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
