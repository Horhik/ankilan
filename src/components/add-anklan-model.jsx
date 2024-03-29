import React, {useEffect} from 'react';
import {Container, Text} from 'native-base';
import {ScrollView} from 'react-native';
import Permissions from './permissions';
import {connect, Provider} from 'react-redux';
import DeckPicker from './view/deck-picker';
import AddWordForm from './anki-form';
import AnkiTemplate from './view/add-main-template';
import {Grid, Row} from 'native-base';
import {
  checkAnkiLanModelForExisting,
  getDeckList,
  getModelList,
  getSavedData,
} from '../actions/anki-get-actions';
import {requestAnkiPermission} from '../actions/anki-get-actions';

const StartScreen = props => {
  useEffect(() => {
    if (props.ankiAvailable) {
      props.getDeckList();
      props.getModelList();
      props.getSavedData();
      props.checkAnkiLanModelForExisting(props.modelName, props.modelList);
    } else {
      console.log('Troubles with permissions');
      props.requestAnkiPermission();
    }
  }, []);
  useEffect(() => {
    props.checkAnkiLanModelForExisting(props.modelName, props.modelList);
  });
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
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
    getDeckList,
    getModelList,
    getSavedData,
    requestAnkiPermission,
  },
)(StartScreen);
