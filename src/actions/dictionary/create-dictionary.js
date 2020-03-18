import {parseDictionary} from './parsing-dictionary';

export const createDictionary = apiRes => {
  const parsedDictionary = parseDictionary(apiRes);
};
