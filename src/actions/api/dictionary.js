import {search} from 'urban-dictionary-client';
import {
  SET_AVAILABLE_API,
  SET_PARSED_DICTIONARY,
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
import {setFields} from '../anki-set-actions';
import {sendWord, submit} from '../form-actions';

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
const setDictioanry = dictioanry => ({
  type: SET_PARSED_DICTIONARY,
  payload: dictioanry,
});

export const wordInfo = word => async dispatch => {
  try {
    const api1 = await getResFromWordsAPI(word);

    //TODO add Urban Dictionary
    /* ********Working with Urban Dictionary*******
     const api2 = await getResFromUrbanDictionary(word);
     const availableApi = getAvailableApi([api1, api2]);
     if (availableApi === false) {
       throw new Error('word not found');
     }
  */
    //function which return universal template for more simple interaction with api
    //TODO available dictionary instead api1
    await dispatch(setAvailableApi(api1));
    const wordDictionary = await createDictionary(api1);
    dispatch(setDictioanry(wordDictionary));
    /* TODO: move sendWord to submit function */
    // sendWord(setFields(wordDictionary));
  } catch (e) {
    console.log(e);
  }
};

export const drawFields = fields => {};
