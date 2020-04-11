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
  let posSet = new Set();
  let examples = [];
  wordsArray.forEach(words => {
    posSet.add(words.partOfSpeech);
    if (words.examples) {
      examples.push(...words.examples);
    }
  });

  posSet.forEach(pos => {
    let defArray = [];
    wordsArray.forEach(words => {
      if (pos === words.partOfSpeech) {
        defArray.push(words.definition);
      }
    });
    definitionList.push({pos, definitions: defArray});
  });
  return {examples, definitions: definitionList};
};

export const parseWordsApi = api => {
  const words = getDefinitionList(api.results).definitions;
  const examples = getDefinitionList(api.results).examples;
  return {
    pronunciation: api.pronunciation.all,
    words: api.results ? words : [],
    examples,
  };
};
