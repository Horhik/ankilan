import React from 'react'
import {connect} from 'react-redux'
import DeckPicker from './view/deck-picker';
import{Form} from 'native-base';

const AddWordForm = props => {
    return (
       <Form>
           <DeckPicker/>
       </Form>
    )
}

export default connect()(AddWordForm)
