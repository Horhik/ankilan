import {
  GET_DECK_LIST,
  REQUEST_PERMISSIONS,
  SET_DECK,
} from '../constants/anki-constants';

const initialState = {
  isApiAvailable: false,
  appHasAccess: false,
  deckList: [],
  selectedDeck: '0',
  mainFieldIsAvailable: false,
  fieldList: [],
};

const ankiReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PERMISSIONS:
      console.log(action.payload);
      return {...state, appHasAccess: action.payload};
    case GET_DECK_LIST:
      return {...state, deckList: action.payload};
    case SET_DECK:
      return {...state, selectedDeck: action.payload};
    default:
      return state;
  }
};
export default ankiReducer;
