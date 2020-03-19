import {
  SET_AVAILABLE_API,
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
    default:
      return state;
  }
};
export default apiReducer;
