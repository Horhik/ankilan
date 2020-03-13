import fetch from 'node-fetch';
const yKey =
    'dict.1.1.20200313T141325Z.a8dfc0a8b66fb54c.f84fd712f759aa3abd7a7ecac35ac608181e2865';
const yDictionary = (
    word = String,
    languages = 'en-ru',
    apiKey = yKey,
) => async dispatch => {
    try {
        const res = await fetch(
            `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${apiKey}&lang=${languages}&text=${word}`, { method: 'GET' },
        );
        const json = await res.json();
        await dispatch(findPartofSpeech(json.def));
        return json.def;
    } catch (e) {
        console.warn('err in yandex-dictionary.js: ', e);
    }
};

const translateTemplate = (pos, tr) => ({
    pos,
    tr,
});

export const findPartofSpeech = dictionary => {
    const amountOfMeanings = dictionary.length;
    // return
    console.log({
        type: '', //TODO create new Constant
        translates: [
            //TODO create flexible field selector, by poses count
            translateTemplate(dictionary[0].pos, dictionary[0].tr[0]),
            translateTemplate(dictionary[1].pos, dictionary[1].tr[0]),
        ],
    });
};

export default yDictionary;