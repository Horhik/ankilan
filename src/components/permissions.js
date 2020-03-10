import React, {useState, useEffect} from 'react';
import {Text, Button, Grid} from 'native-base';
import {connect} from 'react-redux';
import {requestAnkiPermission} from '../actions/anki-get-actions';
const Permissions = props => {
  useEffect(() => {
    props.requestAnkiPermission();
  }, []);
  return (
    <Grid
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Button onPress={() => props.requestAnkiPermission()}>
        <Text>Request access</Text>
      </Button>
    </Grid>
  );
};
export default connect(
  state => ({
    // ankiAccess: state.anki.isApiAvailable,
  }),
  {requestAnkiPermission: requestAnkiPermission},
)(Permissions);
