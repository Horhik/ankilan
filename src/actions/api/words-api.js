import {WORDS_API} from '../../constants/api-constants';

export async function getResFromWordsAPI(word) {
  const req = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      'x-rapidapi-key': 'e08b0f617cmsh74abbf9a3b01eb0p164f22jsnabea29750b15',
    },
  });
  const json = await req.json();
  const res = {...json, source: WORDS_API};
  if (res.success === false) {
    // throw new Error(res.message);
    return false;
  }
  return Promise.resolve(res);
}

const parsePOS = wordArray => {
  let posSet = new Set();
  let posArray = [];
  wordArray.forEach((result, id) => {
    const pos = result.partOfSpeech;
    if (!posSet.has(pos)) {
      posSet.add(pos);
      posArray.push({pos, id});
    }
  });
  return posArray;
};
//get all what anki template need for template
const getDefinitionList = wordsArray => {
  const partOfSpeeches = parsePOS(wordsArray);
  let definitionList = [];
  partOfSpeeches.forEach(pos => {
    const currentWord = wordsArray[pos.id];
    definitionList.push({
      definition: currentWord.definition,
      example: currentWord.examples[0],
      id: pos.id,
    });
  });
  return definitionList;
};

export const parseWordsApi = api => ({
  pronunciation: api.pronunciation.all,
  words: getDefinitionList(api.results),
});
