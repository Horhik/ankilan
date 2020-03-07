import {
  GET_DECK_LIST,
  REQUEST_PERMISSIONS,
  SET_DECK,
  SET_EXISTING_OF_ANKI_LAN_MODEL,
} from '../constants/anki-constants';

const initialState = {
  isApiAvailable: false,
  appHasAccess: false,
  deckList: [],
  selectedDeck: '1',
  mainFieldIsAvailable: false,
  fieldList: [],
  ankiLanModelIsAlreadyExists: false,
  ankiLanModelID: '7410448765670',
  ankiLanModelName: 'AnkiLan',
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
    case SET_EXISTING_OF_ANKI_LAN_MODEL:
      return {...state, ankiLanModelIsAlreadyExists: action.payload};
    default:
      return state;
  }
};
export default ankiReducer;
