import React from 'react';
import {Provider} from 'react-redux';
import StartScreen from './src/components/start-screen';
import store from './src/store';
import Example from './src/components/example';
const App = () => {
  return (
    <Provider store={store}>
      <StartScreen />
      {/*<Example />*/}
    </Provider>
  );
};
export default App;
