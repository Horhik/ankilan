import {search} from "urban-dictionary-client";
import {URBAN_DICTIONARY_API} from "../../constants/api-constants";

export async function getResFromUrbanDictionary(word) {
    const res = await search(word);
    if (res.list.length === 0) {
        // throw new Error('nothing was found');
        return false;
    }
    return Promise.resolve({...res, word, source: URBAN_DICTIONARY_API});
}

export const parseUrbanDictionaryApi = api => {}