import {AnkiDroid} from 'react-native-ankidroid/dist/ankidroid';
import {
  SET_ANKI_NOTE_CREATOR,
  SET_CREATOR_TEMPLATE,
  SET_DECK,
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
