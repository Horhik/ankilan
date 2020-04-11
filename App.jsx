import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import StartScreen from './src/components/add-anklan-model';
import store from './src/store';
import {ScrollView} from 'react-native';
const App = props => {
  return (
    <Provider store={store}>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <StartScreen />
      </ScrollView>
    </Provider>
  );
};
export default App;
