import {search} from 'urban-dictionary-client';
import {
  SET_AVAILABLE_API,
  SET_LOADING_STATE,
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
import store from '../../store';
import {getModelId} from '../anki-get-actions';
import {AnkiDroid} from 'react-native-ankidroid/dist/ankidroid';

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
const setLoadingState = status => ({
  type: SET_LOADING_STATE,
  payload: status,
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
    dispatch(setLoadingState(false));
    //TODO available dictionary instead api1
    await dispatch(setAvailableApi(api1));
    const wordDictionary = await createDictionary(api1);
    dispatch(setDictioanry(wordDictionary));
    /* TODO: move sendWord to submit function */
    // sendWord(setFields(wordDictionary));
    drawFields();
  } catch (e) {
    console.log(e);
  }
};

export const drawFields = fields => {};
