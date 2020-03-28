import {AnkiDroid} from 'react-native-ankidroid/dist/ankidroid';
import {setAnkiNoteCreator, setCreatorTemplate} from './anki-set-actions';
import sendDataToLocaleStorage from './filesystem';
import setSettings, {
  modelFields,
  valueFields,
} from '../constants/anki-model-values';
import {
  checkAnkiLanModelForExisting,
  getFieldList,
  getModelList,
} from './anki-get-actions';

import JSONfn from 'jsonfn';
import store from '../store';
export const createAnkiLanModel = model => async dispatch => {
  try {
    const settings = setSettings(model);

    const selectedDeck = new AnkiDroid(settings);
    await dispatch(setAnkiNoteCreator(selectedDeck));
    await dispatch(setCreatorTemplate(modelFields));
    // const sd = JSON.parse(JSON.stringify(selectedDeck));
    // console.log(sd === selectedDeck);
    // ****************
    alert('oh shit');
    addNote(selectedDeck, valueFields, modelFields);
    // ****************
    // sendDataToLocaleStorage(
    //   setAnkiNoteCreator(sd), //send creator to locale storage
    //   setCreatorTemplate(modelFields),
    // );
    checkAnkiLanModelForExisting(model.name, model.list);
    await dispatch(getModelList());
    await dispatch(getFieldList(model.name));
  } catch (err) {
    console.log(err);
  }
};

//creator is an object what have to store in locale storage.
export const addNote = words => {
  const template = store.getState().anki.noteTemplate;
  const deckId = store.getState().anki.selectedDeck.id;
  const settings = {
    deckId,
    modelId: '1585139654585',
  };
  const creator = new AnkiDroid(settings);

  creator.addNote(words, template);
  alert('sucssess');
};
