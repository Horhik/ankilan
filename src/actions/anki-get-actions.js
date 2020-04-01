import {AnkiDroid} from 'react-native-ankidroid/dist/ankidroid';
import {
  CHECK_ANKI_ACCESS,
  ERROR,
  GET_DECK_LIST,
  GET_FIELD_LIST,
  GET_MODEL_LIST,
  REQUEST_PERMISSIONS,
  SET_ANKI_DATA,
  SET_EXISTING_OF_ANKI_LAN_MODEL,
  SET_FIELD_LIST,
} from '../constants/anki-constants';
import {createAnkiLanModel} from './createAnkiLanModel';
import {getAnkiData} from './filesystem';

/*Permissions*/

const setRequestAnkiPermissions = (err, res) => {
  return err
    ? {type: ERROR, err}
    : {type: REQUEST_PERMISSIONS, payload: res === 'granted'};
};
export const requestAnkiPermission = () => async dispatch => {
  try {
    const [err, res] = await AnkiDroid.requestPermission();
    if (err) throw err;
    await dispatch(setRequestAnkiPermissions(err, res));
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const checkAnkiAccess = async (
  ankiApiProvider = AnkiDroid.isApiAvailable,
) => {
  const [err, res] = await ankiApiProvider();
  return err ? {type: ERROR, err} : {type: CHECK_ANKI_ACCESS, payload: res};
};

/*Anki Data*/

const setDeckList = deckList => {
  return {
    type: GET_DECK_LIST,
    payload: deckList,
  };
};

export const getDeckList = () => async dispatch => {
  try {
    const [err, deckList] = await AnkiDroid.getDeckList();
    if (err) {
      console.log('you have an error');
      throw err;
    }
    await dispatch(setDeckList(deckList));
    return deckList;
  } catch (err) {
    console.log(err);
  }
};

const setModelList = res => {
  return {type: GET_MODEL_LIST, payload: res};
};
export const getModelList = () => async dispatch => {
  try {
    const [err, res] = await AnkiDroid.getModelList();
    if (err) {
      throw err;
    }
    await dispatch(setModelList(res));
  } catch (err) {
    console.log(err);
  }
};

export const setFieldList = fieldList => ({
  type: SET_FIELD_LIST,
  payload: fieldList,
});

export const getFieldList = name => async dispatch => {
  try {
    const [err, res] = await AnkiDroid.getFieldList(name);
    if (err) {
      throw err;
    }
    await dispatch(setFieldList(res));
    return res;
  } catch (err) {
    console.log(err);
  }
};

/*Checking*/
const setExistingOfAnkiLanModel = existing => {
  return {
    type: SET_EXISTING_OF_ANKI_LAN_MODEL,
    payload: existing,
  };
};
export const checkAnkiLanModelForExisting = (
  name,
  modelList,
) => async dispatch => {
  try {
    let id = 0;
    for (let model of modelList) {
      if (model.name === name) {
        id = model.id;
        await dispatch(setExistingOfAnkiLanModel(true));
        return true;
      }
    }
    const err = 'Model not found. Displaying message...';
    throw err;
  } catch (err) {
    console.log(err);
    await dispatch(setExistingOfAnkiLanModel(false));
  }
};

export const getModelId = (models, name) => {
  let id;
  models.forEach(model => {
    if (model.name === name) {
      id = model.id;
      return id;
    }
  });
  return id;
};

const setSavedData = data => ({
  type: SET_ANKI_DATA,
  payload: data,
});

export const getSavedData = () => async dispatch => {
  const data = await getAnkiData();
  setSavedData(data);
};
