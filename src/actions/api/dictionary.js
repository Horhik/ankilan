import {search} from 'urban-dictionary-client';
import {SET_AVAILABLE_API} from '../../constants/api-constants';
const fetch = require('node-fetch');

async function getResFromWordsAPI(word) {
  const req = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      'x-rapidapi-key': 'e08b0f617cmsh74abbf9a3b01eb0p164f22jsnabea29750b15',
    },
  });
  const json = await req.json();
  const res = {...json, source: 'wordsAPI'};
  if (res.success === false) {
    // throw new Error(res.message);
    return false;
  }
  return Promise.resolve(res);
}

async function getResFromUrbanDictionary(word) {
  const res = await search(word);
  if (res.list.length === 0) {
    // throw new Error('nothing was found');
    return false;
  }
  return Promise.resolve({...res, word, source: 'urbanDictionary'});
}

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
    console.log(availableApi);
    if (availableApi === false) {
      throw new Error('word not found');
    }
    await dispatch(setAvailableApi(availableApi));
  } catch (e) {
    console.log(e);
  }
};
