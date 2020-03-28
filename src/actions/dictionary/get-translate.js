import yDictionary from '../api/yandex-dictionary';

const selectByPos = wordArray => {
  let posSet = new Set();
  let selectedArray = [];
  wordArray.forEach((result, id) => {
    const pos = result.pos;
    if (!posSet.has(pos)) {
      posSet.add(pos);
      selectedArray.push(result);
    }
  });
  console.log(selectedArray);
  return selectedArray;
};

export const compoundWithYDictionary = async (definitionList, word) => {
  try {
    const translations = await yDictionary(word);
    let compounded = [];
    // console.log('YANDEX ', translations);
    // console.log('WORDS', definitionList);
    translations.forEach(translate => {
      definitionList.words.forEach(definition => {
        if (definition.pos === translate.pos) {
          const compound = {...definition, ...translate};
          compounded.push(compound);
        }
      });
      if (definitionList.words.length === 0) {
        compounded.push(translate);
      }
    });
    console.log(compounded);
    const selected = selectByPos(compounded);
    // console.log(`RESPONSE FOR: ${word}`, {word, compounded});
    return {
      word,
      pronunciation: `/${definitionList.pronunciation}/`,
      compounded,
      filtered: selected,
    };
  } catch (e) {
    console.log('error is HERE', e);
  }
};
