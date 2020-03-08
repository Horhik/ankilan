import React from 'react'
import {connect} from 'react-redux'
import DeckPicker from './view/deck-picker';
import{Form, Container} from 'native-base';
import AnkiTemplate from './view/add-main-template';
import {ScrollView} from 'react-native';

const AddWordForm = props => {
    return (
        <Container style={{padding: 20}}>
            <DeckPicker/>
            {props.ankiLanModelExists ?
                <Form>
                </Form>
                :
                <AnkiTemplate/>
                    }
        </Container>
    )
}

export default connect(state => ({
    ankiLanModelExists: state.anki.ankiLanModelIsAlreadyExists
}))(AddWordForm)
