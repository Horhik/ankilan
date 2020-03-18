//middleware between two api response parsers
import {URBAN_DICTIONARY_API, WORDS_API} from '../../constants/api-constants';
import {parseWordsApi} from '../api/words-api';
import {parseUrbanDictionaryApi} from '../api/urban-dictionary';

export const parseDictionary = api => {
  switch (api.source) {
    case WORDS_API:
      return parseWordsApi(api);
    case URBAN_DICTIONARY_API:
      alert('Not available yet');
      return parseUrbanDictionaryApi(api);
    default:
      throw new Error('wrong api');
  }
};
