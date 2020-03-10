import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import DeckPicker from './view/deck-picker';
import {Form, Container} from 'native-base';
import AnkiTemplate from './view/add-main-template';
import {ScrollView} from 'react-native';
import {checkAnkiLanModelForExisting} from '../actions/anki-get-actions';

const AnkiForm = props => {
  return (
    <Container style={{padding: 20}}>
      <Form>
        <DeckPicker />
      </Form>
    </Container>
  );
};

export default connect(
  state => ({
    ankiLanModelExists: state.anki.ankiLanModelIsAlreadyExists,
    modelName: state.anki.ankiLanModelName,
    modelList: state.anki.modelList,
    creator: state.anki.noteCreator,
  }),
  {
    checkAnkiLanModelForExisting,
  },
)(AnkiForm);
