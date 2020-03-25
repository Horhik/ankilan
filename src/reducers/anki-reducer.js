import {
  GET_DECK_LIST,
  GET_MODEL_LIST,
  REQUEST_PERMISSIONS,
  SET_ANKI_NOTE_CREATOR,
  SET_CREATOR_TEMPLATE,
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
  ankiLanModelName: '1AnkiLan1111',
  noteCreator: {},
  noteTemplate: [],
};

const ankiReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PERMISSIONS:
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
    case SET_CREATOR_TEMPLATE:
      return {...state, noteTemplate: action.payload};
    case SET_ANKI_NOTE_CREATOR:
      return {...state, noteCreator: action.payload};
    default:
      return state;
  }
};
export default ankiReducer;
