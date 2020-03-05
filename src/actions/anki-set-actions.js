import {AnkiDroid} from 'react-native-ankidroid/dist/ankidroid';
import {SET_DECK} from '../constants/anki-constants';

export const selectDeck = id => ({
  type: SET_DECK,
  payload: id,
});
