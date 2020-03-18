import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import DeckPicker from './view/deck-picker';
import {Form, Container, Item} from 'native-base';
import AnkiTemplate from './view/add-main-template';
import {checkAnkiLanModelForExisting} from '../actions/anki-get-actions';
import InputWord from './view/translatable-word';
import SubmitButton from './view/submit-button';
import yDictionary from '../actions/api/yandex-dictionary';
import {wordInfo} from "../actions/api/dictionary";

const AnkiForm = props => {
  useEffect(() => {
    props.yDictionary('like');
    props.wordInfo('penis poop')
  }, []);
  return (
    <Container style={{padding: 20}}>
      <Form onSubmit={() => alert('hell')}>
        <DeckPicker />
        <InputWord />
        <SubmitButton />
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
    yDictionary,
      wordInfo

  },
)(AnkiForm);
