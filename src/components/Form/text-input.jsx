import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {TextField} from 'react-native-material-textfield';
import {View} from 'native-base';
import {sendField} from '../../actions/form-actions';

const TextInput = props => {
  const input = useRef();
  const [text, setText] = useState(props.value);
  useEffect(() => {
    setText(props.value);
    input.current.setValue(props.value);
  }, [props, props.value]);
  const typing = text => {
      setText(text)
      props.sendField({text, role: props.role})
  }
  return (
    <View >
      <TextField
        value={props.value}
        label={props.label}
        editable={true}
        onChangeText={text => typing(text) }
        ref={input}
        lineType={'none'}
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
export default connect(null, {
    sendField
})(TextInput);
