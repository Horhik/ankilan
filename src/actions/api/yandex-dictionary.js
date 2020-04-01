import fetch from 'node-fetch';
import {SET_YANDEX_DICTIONARY_RESPONSE} from '../../constants/api-constants';
const yKey =
  'dict.1.1.20200313T141325Z.a8dfc0a8b66fb54c.f84fd712f759aa3abd7a7ecac35ac608181e2865';
const yDictionary = async (
  word = String,
  languages = 'en-ru',
  apiKey = yKey,
) => {
  try {
    const res = await fetch(
      `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${apiKey}&lang=${languages}&text=${word}`,
      {method: 'GET'},
    );
    const json = await res.json();
    // console.log('JSON', json);
    return parseResponse(json.def)
  } catch (e) {
    console.log('err in yandex-dictionary.js: ', e);
  }
};

const translateTemplate = (pos, tr) => ({
  pos,
  tr,
});

const parseResponse = res => {
  const parsed = res.map((item, id) => {
    const pos = item.pos;
    const tr = item.tr.map(translate => translate.text);
    return {pos, tr};
  });
  return parsed;
};

export const findPartofSpeech = dictionary => {
  if (dictionary.length > 1) {
    return [
      // TODO create flexible field selector, by poses count
      translateTemplate(dictionary[0].pos, dictionary[0].tr[0].text),
      translateTemplate(dictionary[1].pos, dictionary[1].tr[0].text),
    ];
  } else {
    return [translateTemplate(dictionary[0].pos, dictionary[0].tr[0].text)];
  }
};

export default yDictionary;
