const initialState = {
  isApiAvailable: false,
  isAnkiConnected: false,
  deckList: [],
  mainFieldIsAvailable: false,
  fieldList: [],
};

const ankiReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default ankiReducer;
