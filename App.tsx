import React, {Suspense} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store';
import ReactQueryProvider from './src/services/ReactQuery/ReactQueryProvider';

const App = () => {
  return (
    <Suspense fallback={null}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ReactQueryProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </ReactQueryProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  );
};

export default App;
