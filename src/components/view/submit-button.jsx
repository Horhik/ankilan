import React from 'react';
import {connect} from 'react-redux';
import {Button, Text} from 'native-base';

const SubmitButton = props => {
  return (
    <Button type="submit">
      <Text>Submit</Text>
    </Button>
  );
};
export default connect()(SubmitButton);
