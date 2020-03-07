import React from 'react';
import {Provider} from 'react-redux';
import StartScreen from './src/components/main-component';
import store from './src/store';
const App = props => {
  return (
    <Provider store={store}>
      <StartScreen />
    </Provider>
  );
};
export default App;
