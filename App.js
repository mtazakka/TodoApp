import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/navigation';
import { Provider } from 'react-redux';
import { store } from './src/app/store';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
