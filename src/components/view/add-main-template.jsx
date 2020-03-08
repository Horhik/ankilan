import React, {useEffect} from 'react'
import {Text, Button,Grid, Container} from 'native-base';
import {checkAnkiLanModelForExisting} from '../../actions/anki-get-actions';
import {connect} from 'react-redux'
import {createAnkiLanModel} from '../../actions/createAnkiLanModel';

const AnkiTemplate = props => {
    useEffect(() => {
        props.checkAnkiLanModelForExisting(props.modelName)
    }, [])
    return(
        <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>You have no AnkiLan card template</Text>
            <Button onPress={() => props.createAnkiLanModel({
                name: props.modelName,
                ...props.currentDeck
            })}><Text>Create</Text></Button>

        </Grid>
    )

}

export default connect(state => ({
    modelName: state.anki.ankiLanModelName,
    currentDeck: state.anki.selectedDeck
}), {
    createAnkiLanModel,
    checkAnkiLanModelForExisting
})(AnkiTemplate)
