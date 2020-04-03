import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {TextField} from 'react-native-material-textfield';
import {View} from 'native-base';
const TextInput = props => {
  const input = useRef();
  const [text, setText] = useState(props.value);
  useEffect(() => {
    console.log('changing');
    console.log(props.value);
    setText(props.value);
    input.current.setValue(props.value);
  }, [props, props.value]);
  return (
    <View>
      <TextField
        value={props.value}
        label={props.label}
        editable={true}
        onChangeText={text => setText(text)}
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
export default connect()(TextInput);
