import {
  DEF_LIST1,
  DEF_LIST2,
  EXAMPLES,
  GET_DECK_LIST,
  GET_MODEL_LIST,
  PRONUNCIATION,
  REQUEST_PERMISSIONS,
  SEND_FIELD,
  SET_ANKI_DATA,
  SET_ANKI_NOTE_CREATOR,
  SET_CREATOR_TEMPLATE,
  SET_DECK,
  SET_EXISTING_OF_ANKI_LAN_MODEL,
  SOUND,
  WORD,
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
  ankiLanModelName: 'develop_final_maybe_maybe_maybe',
  noteCreator: {},
  noteTemplate: [],
  currentFields: {
    word: '',
    compounded: [
      {pos: '', tr: '', definition: ''},
      {pos: '', tr: '', definition: ''},
    ],
    example: '',
    pronunciation: '',
    sound: '',
  },
  savedData: {},
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
    case SET_ANKI_DATA:
      return {
        ...state,
        savedData: action.payload,
      };
    case SEND_FIELD: {
      const fields = state.currentFields;
      switch (action.role) {
        case EXAMPLES: {
          return {
            ...state,
            currentFields: {...state.currentFields, example: action.payload},
          };
        }
        case SOUND: {
          return {
            ...state,
            currentFields: {...state.currentFields, sound: action.payload},
          };
        }
        case PRONUNCIATION: {
          return {
            ...state,
            currentFields: {
              ...state.currentFields,
              pronunciation: action.payload,
            },
          };
        }
        case DEF_LIST1: {
          console.log(action.payload);
          console.log(action.role);
          return {
            ...state,
            currentFields: {
              ...state.currentFields,
              compounded: [action.payload, state.currentFields.compounded[1]],
            },
          };
        }
        case DEF_LIST2: {
          return {
            ...state,
            currentFields: {
              ...state.currentFields,
              compounded: [state.currentFields.compounded[0], action.payload],
            },
          };
        }
        case WORD: {
          alert(action.payload);
          return {
            ...state,
            currentFields: {...state.currentFields, word: action.payload},
          };
        }
      }
    }
    default:
      return state;
  }
};
export default ankiReducer;
