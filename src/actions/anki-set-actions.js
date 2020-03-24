import {
  SET_ANKI_NOTE_CREATOR,
  SET_CREATOR_TEMPLATE,
  SET_DECK,
  SET_FIELDS,
} from '../constants/anki-constants';

export const selectDeck = id => ({
  type: SET_DECK,
  payload: id,
});

export const setAnkiNoteCreator = creator => ({
  type: SET_ANKI_NOTE_CREATOR,
  payload: creator,
});

export const setCreatorTemplate = template => ({
  type: SET_CREATOR_TEMPLATE,
  payload: template,
});

const parseToAnkiFormat = dict => {
  /*
*** TEMPLATE ***
const modelFields = [
  'Word or sentence',
  'Part of speech 1',
  'Translation 1',
  'Definition 1',
  'Part of speech 2',
  'Translation 2',
  'Definition 2',
  'Usage example',
  'Transcription',
  'Sound',
]
*/

  const tr1 = dict.compounded[0];
  const tr2 = dict.compounded[1] || {};
  return [
    dict.word,
    tr1.pos,
    tr1.tr,
    tr1.definition,
    tr2.pos || '',
    tr2.tr || '',
    tr2.definition || '',
    `${tr1.example || ''} \n ${tr2.example || ''}`,
    dict.pronunciation,
    `[sound:${dict.sound}]`,
  ];
};

export const setFields = dict => ({
  type: SET_FIELDS,
  payload: parseToAnkiFormat(dict),
});
