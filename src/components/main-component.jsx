import React from 'react';
import {Container, Text} from 'native-base';
import {ScrollView} from 'react-native'
import Permissions from './permissions';
import {connect, Provider} from 'react-redux';
import DeckPicker from './view/deck-picker';
import AddWordForm from './add-word-form';

const StartScreen = props => {
    return (
        <ScrollView>
            {!props.ankiAvailable? <Permissions /> : null}
                <AddWordForm/>
        </ScrollView>
    )
};

export default connect(state => ({
    ankiAvailable: state.anki.appHasAccess,
}))(StartScreen);
