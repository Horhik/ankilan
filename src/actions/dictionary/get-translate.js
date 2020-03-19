import yDictionary from '../api/yandex-dictionary';
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
    console.log(`RESPONSE FOR: ${word}`, compounded);
  } catch (e) {
    console.log('erris HERE', e);
  }
};

/*
import yDictionary from '../api/yandex-dictionary';
let smallStore = {};

export const compoundWithYDictionary = async (definitionList, word) => {
  let properDefinitions = [];
  const translations = (() => {
    yDictionary(word).then(res => {
      smallStore.res = res;
    });
  })();
  const yDictionaryRes = smallStore.res.payload;
  alert('foo');
  console.log(yDictionaryRes, definitionList);
};*/
