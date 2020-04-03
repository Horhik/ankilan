import yDictionary from '../api/yandex-dictionary';
import {parseDictionary} from './parsing-dictionary';

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
  return selectedArray;
};

export const compoundWithYDictionary = async (definitionList, word) => {
  try {
    const translations = await yDictionary(word);
    const words = definitionList.words;
    let compounded = [];

    // console.log('YANDEX ', translations);
    // console.log('WORDS', definitionList);
    let PoSes = new Set();
    translations.forEach(tr => PoSes.add(tr.pos));
    words.forEach(df => PoSes.add(df.pos));

    PoSes.forEach(pos => {
      let trs = [];
      translations.forEach(tr => {
        if (tr.pos === pos) {
          tr.tr.forEach(trans => trs.push(trans));
        }
      });
      let definitions = [];
      words.forEach(word => {
        if (word.pos === pos) {
          word.definitions.forEach(w => definitions.push(w));
        }
      });
      // compounded.push({pos, trs, definitions});
      compounded.push({
        pos: pos,
        translates: trs,
        definitions,
      });
    });

    return {
      word,
      pronunciation: `/${definitionList.pronunciation}/`,
      compounded,
    };
  } catch (e) {
    console.log('error is HERE', e);
  }
};
