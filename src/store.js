import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import mainReducer from './reducers/main-reducer'; //your reducer

const composeEnhancers = composeWithDevTools({realtime: true, port: 8081}); //possible to run without arguments
const store = createStore(
  mainReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
export default store;
