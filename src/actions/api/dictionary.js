import {search} from 'urban-dictionary-client';
import {
  SET_AVAILABLE_API,
  URBAN_DICTIONARY_API,
  WORDS_API,
} from '../../constants/api-constants';
const fetch = require('node-fetch');
import {getResFromWordsAPI, parseWordsApi} from './words-api';
import {
  getResFromUrbanDictionary,
  parseUrbanDictionaryApi,
} from './urban-dictionary';
import {createDictionary} from '../dictionary/create-dictionary';

const getAvailableApi = (apiArray = []) => {
  for (const api of apiArray) {
    if (api) {
      return api;
    }
  }
  return false;
};

const setAvailableApi = api => ({
  type: SET_AVAILABLE_API,
  payload: api,
});

export const wordInfo = word => async dispatch => {
  try {
    const api1 = await getResFromWordsAPI(word);
    const api2 = await getResFromUrbanDictionary(word);
    const availableApi = getAvailableApi([api1, api2]);
    if (availableApi === false) {
      throw new Error('word not found');
    }
    console.log(availableApi);
    //function which return universal template for more simple interaction with api
    await dispatch(setAvailableApi(availableApi));
    createDictionary(availableApi);
  } catch (e) {
    console.log(e);
  }
};
