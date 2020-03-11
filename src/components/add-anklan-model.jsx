import React, {useEffect} from 'react';
import {Container, Text} from 'native-base';
import {ScrollView} from 'react-native';
import Permissions from './permissions';
import {connect, Provider} from 'react-redux';
import DeckPicker from './view/deck-picker';
import AddWordForm from './anki-form';
import AnkiTemplate from './view/add-main-template';
import {Grid, Row} from 'native-base';
import {checkAnkiLanModelForExisting} from '../actions/anki-get-actions';

const StartScreen = props => {
  useEffect(() => {
    props.checkAnkiLanModelForExisting(props.modelName, props.modelList);
  });
  return (
    <ScrollView>
      {props.ankiAvailable ? (
        props.ankiLanModelExists ? (
          <AddWordForm />
        ) : (
          <AnkiTemplate />
        )
      ) : (
        <Permissions />
      )}
    </ScrollView>
  );
};

export default connect(
  state => ({
    ankiAvailable: state.anki.appHasAccess,
    ankiLanModelExists: state.anki.ankiLanModelIsAlreadyExists,
    modelName: state.anki.ankiLanModelName,
    modelList: state.anki.modelList,
    creator: state.anki.noteCreator,
  }),
  {
    checkAnkiLanModelForExisting,
  })(StartScreen);
