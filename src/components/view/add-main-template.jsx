import React, {useEffect} from 'react'
import {Text, Button,Grid, Container} from 'native-base';
import {checkAnkiLanModelForExisting} from '../../actions/anki-get-actions';
import {connect} from 'react-redux'
import {createAnkiLanModel} from '../../actions/createAnkiLanModel';

const AnkiTemplate = props => {
    useEffect(() => {
        props.checkAnkiLanModelForExisting(props.id)
    }, [])
    return(
        <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>You have no AnkiLan card template</Text>
            <Button onPress={() => props.createAnkiLanModel({
                id: props.modelId,
                name: props.modelName,
            })}><Text>Create</Text></Button>

        </Grid>
    )

}

export default connect(state => ({
   modelId: state.anki.ankiLanModelID,
    modelName: state.anki.ankiLanModelName
}), {
    createAnkiLanModel,
    checkAnkiLanModelForExisting
})(AnkiTemplate)
