import {SELECT_POS_ID} from '../constants/anki-constants';

export const setPosId = (id, value) => {
  console.log('setPosId');
  console.log(id);
  console.log(value);
  return {
    type: SELECT_POS_ID,
    payload: value,
    id,
  };
};
