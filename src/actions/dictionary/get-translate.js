import yDictionary from '../api/yandex-dictionary';
export const compoundWithYDictionary = (definitionList, word) => {
  const translations = (async () => {
    const res = await yDictionary(word);
    return await res;
  })();
  console.log(translations);
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
