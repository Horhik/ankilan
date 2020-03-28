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

//get all what anki template need for template
const getDefinitionList = wordsArray => {
  let definitionList = [];
  /*partOfSpeeches*/
  wordsArray.forEach(currentWord => {
    definitionList.push({
      definition: currentWord.definition,
      example: currentWord.examples ? currentWord.examples[0] : undefined,
      pos: currentWord.partOfSpeech,
    });
  });
  console.log(definitionList);
  return definitionList;
};

export const parseWordsApi = api => ({
  pronunciation: api.pronunciation.all,
  words: api.results ? getDefinitionList(api.results) : [],
});
