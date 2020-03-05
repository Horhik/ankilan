import React from 'react';
import {Provider} from 'react-redux';
import StartScreen from './src/components/start-screen';
import store from './src/store';
const App = () => {
  return (
    <Provider store={store}>
      <StartScreen />
    </Provider>
  );
};
export default App;
