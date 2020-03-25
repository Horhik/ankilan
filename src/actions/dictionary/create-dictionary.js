import {parseDictionary} from './parsing-dictionary';
import getAudio from '../api/word-sound';
import {compoundWithYDictionary} from './get-translate';

export const createDictionary = async apiRes => {
  const word = apiRes.word;
  const parsedDictionary = parseDictionary(apiRes);
  const audio = await getAudio(word);
  const compounded = await compoundWithYDictionary(parsedDictionary, word);
  return {...compounded, sound: audio};
};
