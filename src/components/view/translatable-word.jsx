import React from 'react';
import {connect} from 'react-redux';
import {TextField} from 'react-native-material-textfield';

const InputWord = props => {
  const submit = () => {
    console.log('he');
  };
  return <TextField label={'Your word'} onChange={submit} />;
};
export default connect(state => ({}), {})(InputWord);
