import AsyncStorage from '@react-native-community/async-storage';
import {
  ANKILAN_NOTE_CREATOR,
  ANKILAN_NOTE_TEMPLATE,
} from '../constants/anki-constants';
const sendDataToLocaleStorage = async (creator, template) => {
  try {
    await AsyncStorage.setItem(ANKILAN_NOTE_CREATOR, JSON.stringify(creator));
    await AsyncStorage.setItem(ANKILAN_NOTE_TEMPLATE, JSON.stringify(template));
  } catch (e) {
    // saving error
    alert('Error while syncing with filesystem');
    console.log(e);
  }
};
export default sendDataToLocaleStorage;

export const getTemplate = async () => {
  try {
    const value = await AsyncStorage.getItem(ANKILAN_NOTE_TEMPLATE);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

export const getCreator = async () => {
  try {
    const value = await AsyncStorage.getItem(ANKILAN_NOTE_TEMPLATE);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
  }
};
