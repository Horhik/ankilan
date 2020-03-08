import {
  GET_DECK_LIST,
  GET_MODEL_LIST,
  REQUEST_PERMISSIONS,
  SET_DECK,
  SET_EXISTING_OF_ANKI_LAN_MODEL,
} from '../constants/anki-constants';

const initialState = {
  isApiAvailable: false,
  appHasAccess: false,
  deckList: [],
  modelList: [],
  selectedDeck: {
    id: '1',
    deck: Object,
  },
  mainFieldIsAvailable: false,
  fieldList: [],
  ankiLanModelIsAlreadyExists: false,
  ankiLanModelName: 'AnkiLan_test',
};

const ankiReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PERMISSIONS:
      console.log(action.payload);
      return {...state, appHasAccess: action.payload};
    case GET_DECK_LIST:
      return {...state, deckList: action.payload};
    case GET_MODEL_LIST:
      return {...state, modelList: action.payload};
    case SET_DECK:
      return {
        ...state,
        selectedDeck: {...state.selectedDeck, ...action.payload},
      };
    case SET_EXISTING_OF_ANKI_LAN_MODEL:
      return {...state, ankiLanModelIsAlreadyExists: action.payload};
    default:
      return state;
  }
};
export default ankiReducer;
