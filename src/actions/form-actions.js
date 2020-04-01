import {getCreator, getTemplate} from './filesystem';
import {addNote} from './createAnkiLanModel';

export const submit = () => ({});
export const sendWord = async fields => {
  addNote(fields.payload);
};
