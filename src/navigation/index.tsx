import {StyleSheet} from 'react-native';
import React from 'react';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

const AppNavigator = () => {
  const isAuth = false;
  return <>{isAuth ? <MainNavigator /> : <AuthNavigator />}</>;
};

export default AppNavigator;

const styles = StyleSheet.create({});
