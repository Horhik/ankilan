import {getCreator, getTemplate} from './filesystem';
import {addNote} from './createAnkiLanModel';

export const submit = () => ({});
export const sendWord = async fields => {
  // const creator = await getCreator();
  // const template = JSON.parse(await getTemplate()).payload;
  // console.log(creator);
  // console.log(template);
  console.log(fields);
  addNote(fields.payload);
};
