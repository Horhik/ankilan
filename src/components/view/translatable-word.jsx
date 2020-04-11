import React, {useRef} from 'react';
import {connect} from 'react-redux';
import {TextField} from 'react-native-material-textfield';

const InputWord = props => {
  const sendWord = word => {
    props.word(word);
  };
  return (
    <TextField
      label={'Your word'}
      onChangeText={word => sendWord(word)}
      onSubmitEditing={props.onSubmit}
    />
  );
};
export default connect(
  state => ({}),
  {},
)(InputWord);
