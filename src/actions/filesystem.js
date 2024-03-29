import AsyncStorage from '@react-native-community/async-storage';
import {
  ANKILAN_DATA,
  ANKILAN_NOTE_CREATOR,
  ANKILAN_NOTE_TEMPLATE,
} from '../constants/anki-constants';

const sendDataToLocaleStorage = async data => {
  try {
    await AsyncStorage.clear();
    await AsyncStorage.setItem(ANKILAN_DATA, JSON.stringify(data));
  } catch (e) {
    // saving error
    alert('Error while syncing with filesystem');
    console.log(e);
  }
};

export const getAnkiData = async () => {
  try {
    const value = await AsyncStorage.getItem(ANKILAN_DATA);
    if (value !== null) {
      // value previously stored
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
  }
};

export default sendDataToLocaleStorage;
