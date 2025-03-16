import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import NotificationScreen from '../screens/Notifications/NotificationScreen';
import NewPostScreen from '../screens/NewPost/NewPostScreen';
import EditProfile from '../screens/EditProfile/EditProfile';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="NewPost"
        component={NewPostScreen}
        options={{animation: 'slide_from_right'}}
        // options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
