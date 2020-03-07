import React, {useState, useEffect} from 'react';
import {Text, Button} from 'native-base';
import {connect} from 'react-redux';
import {requestAnkiPermission} from '../actions/anki-get-actions';
const Permissions = props => {
  useEffect(() => {
    props.requestAnkiPermission();
  }, []);
  return (
    <Button onPress={() => requestAnkiPermission()}>
      <Text>Request access</Text>
    </Button>
  );
};
export default connect(
  state => ({
    // ankiAccess: state.anki.isApiAvailable,
  }),
  {requestAnkiPermission: requestAnkiPermission},
)(Permissions);
