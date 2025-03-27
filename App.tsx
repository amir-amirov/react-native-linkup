import React, {Suspense, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store';
import ReactQueryProvider from './src/services/ReactQuery/ReactQueryProvider';
import notifee, {EventType} from '@notifee/react-native';

import {createNavigationContainerRef} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import './src/locales/i18n';

import SplashScreen from 'react-native-splash-screen';
import {Platform} from 'react-native';

import { linking } from './src/navigation/Linking';

export const navigationRef: any = createNavigationContainerRef();

export function navigate(name: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name);
  }
}

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }

    return notifee.onForegroundEvent(({type, detail}) => {
      if (type === EventType.PRESS) {
        console.log('Notification is pressed..');
        navigate('Notifications');
      }
    });
  }, []);
  return (
    <Suspense fallback={null}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ReactQueryProvider>
            <GestureHandlerRootView style={{flex: 1}}>
              <NavigationContainer ref={navigationRef} linking={linking} >
                <AppNavigator />
              </NavigationContainer>
            </GestureHandlerRootView>
          </ReactQueryProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  );
};

export default App;
