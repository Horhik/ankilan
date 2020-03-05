import {combineReducers} from 'redux';
import ankiReducer from './anki-reducer';
import apiReducer from './api-reducer';

const mainReducer = combineReducers({
  ankiReducer,
  apiReducer,
});

export default mainReducer;
