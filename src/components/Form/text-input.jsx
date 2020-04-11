import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {TextField} from 'react-native-material-textfield';
import {View} from 'native-base';
import {sendField} from '../../actions/form-actions';
import FieldEditor from './field-editor';

const TextInput = props => {
  useEffect(() => {
    // console.log(props.value)
  });
  return (
    <View>
      <FieldEditor
        hasChanged={c => true}
        data={{
          values: [props.value],
          label: props.label,
        }}
      />
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#00000050',
        }}
      />
    </View>
  );
};
export default connect(
  null,
  {
    sendField,
  },
)(TextInput);
