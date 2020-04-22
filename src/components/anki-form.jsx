import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import DeckPicker from './view/deck-picker';
import {Form, Container, Item} from 'native-base';
import {checkAnkiLanModelForExisting} from '../actions/anki-get-actions';
import InputWord from './view/translatable-word';
import SubmitButton from './Form/submit-button';
import {ScrollView} from 'react-native';
import {wordInfo} from '../actions/api/dictionary';
import FieldEditor from './Form/field-editor';
import FieldList from './Form/field-list';
import {WORD} from "../constants/anki-constants";
import {sendField} from "../actions/form-actions";
import {setLoadingState} from "../actions/api/dictionary";

const AnkiForm = props => {
  const [target, setTarget] = useState('');
  const [fields, setFields] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // props.wordInfo('Urge');
    //   props.wordInfo('Maze');
    //   props.wordInfo('Ramification');
    //   props.wordInfo('Dare');
    //   props.wordInfo('Entrepreneurship');
    //   props.wordInfo('meagre');
    //   props.wordInfo('meager');
  }, []);
  const getWord = word => {
    setTarget(word);
  };
  const submit = () => {
    props.setLoadingState(false);
    props.wordInfo(target);
    setSubmitted(props.available)
      props.sendField({
          text: target,
          role: WORD
      })
    // console.log(props.available, props.data)
  };

  return (
    <ScrollView style={{padding: 20}}>
      <Form>
        <DeckPicker />
        <InputWord word={getWord} onSubmit={submit} />
        {submitted ? <FieldList /> : <SubmitButton onSubmit={submit} />}
      </Form>
    </ScrollView>
  );
};

export default connect(
  state => ({
    ankiLanModelExists: state.anki.ankiLanModelIsAlreadyExists,
    modelName: state.anki.ankiLanModelName,
    modelList: state.anki.modelList,
    creator: state.anki.noteCreator,
    data: state,
      word: state.api.availableApi.word,
    available: state.api.apiIsLoaded,

  }),
  {
    checkAnkiLanModelForExisting,
    wordInfo,
      sendField,
      setLoadingState,

  },
)(AnkiForm);
