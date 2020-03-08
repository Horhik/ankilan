import React from 'react';
import {Container, Text} from 'native-base';
import {ScrollView} from 'react-native'
import Permissions from './permissions';
import {connect, Provider} from 'react-redux';
import DeckPicker from './view/deck-picker';
import AddWordForm from './anki-form';
import AnkiTemplate from './view/add-main-template';
import {Grid, Row} from 'native-base';

const StartScreen = props => {
    return (
        <ScrollView>
            {props.ankiAvailable? <AddWordForm/>: <Permissions /> }
        </ScrollView>
    )
};

export default connect(state => ({
    ankiAvailable: state.anki.appHasAccess,
}))(StartScreen);
