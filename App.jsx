import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import StartScreen from './src/components/add-anklan-model';
import store from './src/store';
const App = props => {
  return (
    <Provider store={store}>
      <StartScreen />
    </Provider>
  );
};
export default App;
