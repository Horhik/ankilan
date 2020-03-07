import {AnkiDroid} from 'react-native-ankidroid/dist/ankidroid';
import {
  CHECK_ANKI_ACCESS,
  ERROR,
  GET_DECK_LIST,
  GET_FIELD_LIST,
  GET_MODEL_LIST,
  REQUEST_PERMISSIONS,
} from '../constants/anki-constants';
import {getPermissionName} from 'react-native-ankidroid/dist/utilities';

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

export const getModelList = async (
  getModelListFunction = AnkiDroid.getModelList,
) => {
  const [err, res] = await getModelListFunction();
  return err ? {type: ERROR, err} : {type: GET_MODEL_LIST, payload: res};
};

export const getFieldList = async (
  id,
  getFieldListFunction = AnkiDroid.getFieldList,
) => {
  const [err, res] = await getFieldListFunction(id);
  return err ? {type: ERROR, err} : {type: GET_FIELD_LIST, payload: res};
};

export const dd = () => {};
