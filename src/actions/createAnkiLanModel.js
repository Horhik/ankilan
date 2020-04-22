import {AnkiDroid} from 'react-native-ankidroid/dist/ankidroid';
import {setAnkiNoteCreator, setCreatorTemplate} from './anki-set-actions';
import sendDataToLocaleStorage, {getAnkiData} from './filesystem';
import setSettings, {
  modelFields,
  valueFields,
} from '../constants/anki-model-values';
import {
  checkAnkiLanModelForExisting,
  getFieldList,
  getModelId,
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

    firstNote(selectedDeck, valueFields, modelFields);

    // ****************
    // sendDataToLocaleStorage(
    //   setAnkiNoteCreator(sd), //send creator to locale storage
    //   setCreatorTemplate(modelFields),
    // );
    checkAnkiLanModelForExisting(model.name, model.list);
    await dispatch(getModelList());
    const [err, modelList] = await AnkiDroid.getModelList();
    const modelId = await getModelId(modelList, model.name);
    await console.log(modelId);
    const [, fieldList] = await AnkiDroid.getFieldList(model.name);

    console.log(fieldList, modelId);

    await sendDataToLocaleStorage({
      fieldList,
      modelName: model.name,
      modelId,
    });
    console.log(await getAnkiData());
  } catch (err) {
    console.log('error in createAnkiLanModel.js', err);
  }
};

const firstNote = (creator, fields, template) =>
  creator.addNote(fields, template);
//creator is an object what have to store in locale storage.
export const addNote = async words => {
  const ankiData = await getAnkiData();
  await console.log(ankiData);
  const template = await ankiData.fieldList;
  const deckId = store.getState().anki.selectedDeck.id;
  const modelId = await ankiData.modelId;
  console.log(template, deckId, modelId);
  const settings = {
    deckId,
    modelId,
  };
  const creator = new AnkiDroid(settings);

  console.log(template);
  console.log(words);
  creator.addNote(words, template);
  alert('sucssess');
};
