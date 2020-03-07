import {combineReducers} from 'redux';
import ankiReducer from './anki-reducer';
import apiReducer from './api-reducer';

const mainReducer = combineReducers({
  anki: ankiReducer,
  api: apiReducer,
});

export default mainReducer;
