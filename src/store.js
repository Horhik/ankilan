import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import mainReducer from './reducers/main-reducer'; //your reducer

const composeEnhancers = composeWithDevTools({realtime: true, port: 8081}); //possible to run without arguments
const store = createStore(
  mainReducer,
  /* preloadedState, */ composeEnhancers(/*connect of middelwares*/),
);
export default store;
