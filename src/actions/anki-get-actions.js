import {AnkiDroid} from 'react-native-ankidroid/dist/ankidroid';
import {
  CHECK_ANKI_ACCESS,
  ERROR,
  GET_DECK_LIST,
  GET_FIELD_LIST,
  GET_MODEL_LIST,
  REQUEST_PERMISSIONS,
  SET_EXISTING_OF_ANKI_LAN_MODEL,
} from '../constants/anki-constants';
import {createAnkiLanModel} from './createAnkiLanModel';

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
    console.log(res);
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
  console.log(res, 'result');
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
    console.log(res);
    await dispatch(setModelList(res));
  } catch (err) {
    console.log(err);
  }
};

export const getFieldList = async (
  id,
  getFieldListFunction = AnkiDroid.getFieldList,
) => {
  const [err, res] = await getFieldListFunction(id);
  return err ? {type: ERROR, err} : {type: GET_FIELD_LIST, payload: res};
};

/*Checking*/
const setExistingOfAnkiLanModel = existing => {
  return {
    type: SET_EXISTING_OF_ANKI_LAN_MODEL,
    payload: existing,
  };
};
export const checkAnkiLanModelForExisting = name => async dispatch => {
  try {
    const [err, res] = await AnkiDroid.getFieldList(name);
    if (err) {
      throw err;
    }
    console.log(res);
    await dispatch(setExistingOfAnkiLanModel(true));
    return res;
  } catch (err) {
    await dispatch(setExistingOfAnkiLanModel(false));
    await createAnkiLanModel(id);
  }
};
