import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import DeckPicker from './view/deck-picker';
import {Form, Container, Item} from 'native-base';
import {checkAnkiLanModelForExisting} from '../actions/anki-get-actions';
import InputWord from './view/translatable-word';
import SubmitButton from './view/submit-button';
import {wordInfo} from "../actions/api/dictionary";

const AnkiForm = props => {
    const [target, setTarget] = useState('')
    const [fields, setFields] = useState({})
  useEffect(() => {
    // props.wordInfo('Urge');
    //   props.wordInfo('Maze');
    //   props.wordInfo('Ramification');
    //   props.wordInfo('Dare');
    //   props.wordInfo('Entrepreneurship');
    //   props.wordInfo('meagre');
    //   props.wordInfo('meager');

  }, []);
  const getWord = (word) => {
      setTarget(word)
  };
  const submit = () => {
      props.wordInfo(target);
  };

  return (
    <Container style={{padding: 20}}>
      <Form >
        <DeckPicker />
        <InputWord word={getWord} onSubmit={submit}/>
        <SubmitButton onSubmit={submit} />
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
      wordInfo

  },
)(AnkiForm);
