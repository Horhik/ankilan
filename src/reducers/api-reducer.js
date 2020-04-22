import {
  SET_ALL_FIELDS,
  SET_AVAILABLE_API,
  SET_LOADING_STATE,
  SET_PARSED_DICTIONARY,
  SET_YANDEX_DICTIONARY_RESPONSE,
} from '../constants/api-constants';
import {SET_FIELDS} from '../constants/anki-constants';
import {addNote} from '../actions/createAnkiLanModel';

const initialState = {
  word: '',
  translatedObject: {},
  wordSoundLink: '',
  availableApi: {},
  availableApiName: '',
  yandexDictionaryInfo: [],
  parsedDictionary: {},
  availableFields: [],
  allFields: [],
  apiIsLoaded: false,
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_YANDEX_DICTIONARY_RESPONSE:
      return {
        ...state,
        yandexDictionaryInfo: action.payload,
      };
    case SET_AVAILABLE_API:
      return {
        ...state,
        availableApi: action.payload,
        availableApiName: action.payload.source,
      };
    case SET_PARSED_DICTIONARY:
      console.log('HEEERWELFDSKFj');
      return {
        ...state,
        parsedDictionary: action.payload,
        apiIsLoaded: true,
      };
    case SET_LOADING_STATE:
      return {
        ...state,
        apiIsLoaded: action.payload,
      };
    case SET_FIELDS:
      addNote(action.payload);
      return {
        ...state,
        availableFields: action.payload,
      };
    case SET_ALL_FIELDS:
      return {
        ...state,
        allFields: action.payload,
      };
    default:
      return state;
  }
};
export default apiReducer;
