import {
  SET_AVAILABLE_API,
  SET_PARSED_DICTIONARY,
  SET_YANDEX_DICTIONARY_RESPONSE,
} from '../constants/api-constants';

const initialState = {
  word: '',
  translatedObject: {},
  wordSoundLink: '',
  availableApi: {},
  availableApiName: '',
  yandexDictionaryInfo: [],
  parsedDictionary: {},
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
      return {
        ...state,
        parsedDictionary: action.payload,
      };
    default:
      return state;
  }
};
export default apiReducer;
