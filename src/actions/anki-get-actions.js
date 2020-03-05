import {AnkiDroid} from 'react-native-ankidroid/dist/ankidroid';
import {
  CHECK_ANKI_ACCESS,
  ERROR,
  GET_DECK_LIST,
  GET_FIELD_LIST,
  GET_MODEL_LIST,
  REQUEST_PERMISSIONS,
} from '../constants/anki-constants';

export const requestAnkiPermissions = async (
  ankiProvider = AnkiDroid.requestPermission,
) => {
  const [err, res] = await ankiProvider();
  const permission = res === 'granted';
  return err ? {type: ERROR, err} : {type: REQUEST_PERMISSIONS, permission};
};

export const checkAnkiAccess = async (
  ankiApiProvider = AnkiDroid.isApiAvailable,
) => {
  const [err, res] = await ankiApiProvider();
  return err ? {type: ERROR, err} : {type: CHECK_ANKI_ACCESS, payload: res};
};

export const getDeckList = async (
  getDeckListFunction = AnkiDroid.getDeckList,
) => {
  const [err, res] = await getDeckListFunction();
  return err ? {type: ERROR, err} : {type: GET_DECK_LIST, payload: res};
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
