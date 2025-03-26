import React, {useEffect, useState} from 'react';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {useUser} from '../store/user';
import baseService from '../services/axios/baseService';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';

const AppNavigator = () => {
  const {isAuth} = useUser();

  const [deviceToken, setDeviceToken] = useState('');
  const requestPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();

      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }

      const token = await messaging().getToken();
      if (token) {
        setDeviceToken(token);
        console.log('FCM Token: ', token);
        sendTokenToBackend(token);
      }
    } catch (err) {
      console.log('Permission request failed: ', err);
    }
  };

  const sendTokenToBackend = async (token: string) => {
    try {
      const response = await baseService.post('/users/fcm-token', {
        device_token: token,
      });

      console.log('have got response:', response);
    } catch (err) {
      console.log(err);
    }
  };

  // Step 1: Create a notification channel (required for Android)
  const createNotificationChannel = async () => {
    try {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        sound: 'default', // Add a default sound for the channel
      });
      console.log('Notification channel created');
    } catch (error) {
      console.error('Failed to create notification channel:', error);
    }
  };

  // Step 2: Request notification permissions
  // const checkAndRequestPermissions = async () => {
  //   try {
  //     const settings = await notifee.requestPermission();
  //     if (settings.authorizationStatus >= 1) {
  //       console.log('Notification permissions granted');
  //     } else {
  //       console.log('Notification permissions denied');
  //       Alert.alert(
  //         'Permissions Required',
  //         'Please enable notifications in your app settings.',
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Failed to request notification permissions:', error);
  //   }
  // };

  // Step 3: Display a notification
  const displayNotif = async (title: string, body: string) => {
    try {
      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId: 'default',
          smallIcon: 'ic_notification',
          pressAction: {
            id: 'default',
          },
        },
      });
      console.log('Notification displayed successfully');
    } catch (error) {
      console.error('Failed to display notification:', error);
    }
  };

  useEffect(() => {
    if (isAuth) {
      requestPermission();
    }

    createNotificationChannel();
    // checkAndRequestPermissions();

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('Notification in foreground: ', remoteMessage);
      if (remoteMessage) {
        displayNotif(
          remoteMessage.notification?.title ?? 'No Title',
          remoteMessage.notification?.body ?? 'No Body',
        );
      }
    });

    return () => {
      unsubscribeOnMessage();
    };
  }, [isAuth]);

  // const isAuth = false;
  return <>{isAuth ? <MainNavigator /> : <AuthNavigator />}</>;
};

export default AppNavigator;
