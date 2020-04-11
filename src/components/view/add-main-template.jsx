import React from 'react';
import {Text, Button, Grid, Container} from 'native-base';
import {connect} from 'react-redux';
import {createAnkiLanModel} from '../../actions/createAnkiLanModel';

const AnkiTemplate = props => {
  return (
    <Grid
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text>You have no AnkiLan card template</Text>
      <Button
        onPress={() =>
          props.createAnkiLanModel({
            name: props.modelName,
            list: props.modelList,
            ...props.currentDeck,
          })
        }>
        <Text>Create</Text>
      </Button>
    </Grid>
  );
};

export default connect(
  state => ({
    modelName: state.anki.ankiLanModelName,
    currentDeck: state.anki.selectedDeck,
    modelList: state.anki.modelList,
  }),
  {
    createAnkiLanModel,
  },
)(AnkiTemplate);
