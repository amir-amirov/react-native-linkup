import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="Signup"
        component={SignUpScreen}
        options={{animation: 'slide_from_right'}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({});
