import {parseDictionary} from './parsing-dictionary';
import getAudio from '../api/word-sound';
import {compoundWithYDictionary} from './get-translate';

export const createDictionary = apiRes => {
  const word = apiRes.word;
  const parsedDictionary = parseDictionary(apiRes);
  const audio = getAudio(word);
  compoundWithYDictionary(parsedDictionary, word);
};
