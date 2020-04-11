import React from 'react';
import {connect} from 'react-redux';
import {Button, Text} from 'native-base';

const SubmitButton = props => {
  return (
    <Button onPress={props.onSubmit}>
      <Text>Send</Text>
    </Button>
  );
};
export default SubmitButton;
