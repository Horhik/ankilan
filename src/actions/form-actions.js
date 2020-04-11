import {getCreator, getTemplate} from './filesystem';
import {addNote} from './createAnkiLanModel';
import {SEND_FIELD} from '../constants/anki-constants';

export const submit = () => ({});
export const sendWord = async fields => {
  addNote(fields.payload);
};

export const sendField = field => ({
  type: SEND_FIELD,
  payload: field.text,
  role: field.role,
});
