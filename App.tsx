import {StyleSheet} from 'react-native';
import React, {Suspense} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <Suspense fallback={null}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Suspense>
  );
};

export default App;

const styles = StyleSheet.create({});
