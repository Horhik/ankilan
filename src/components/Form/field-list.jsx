import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import {View, Input} from 'native-base'
import {TextField} from 'react-native-material-textfield';
import FieldEditor from './field-editor';
import TextInput from './text-input';
import PickerList from './picker-list';

const FieldList = props => {
    const [pronunciation, setPronunciation] = useState()
    const [sound, setSound] = useState()
    const [examples, setExamples] = useState([])
    useEffect(() => {
        setSound(props.response.sound)
        setPronunciation(props.response.pronunciation)
        setExamples(props.response.examples)
    },[props.response])
    useEffect(() => {
            console.log(sound, pronunciation)
        }
    )
    return (
        <View>
            <PickerList labelNum={1}/>
            <PickerList labelNum={2}/>
            <FieldEditor data={{
                label: 'Usage example',
                values: examples || ['can not find the example']
            }}/>
            <TextInput value={sound}  label={'Sound'}/>
            <TextInput value={pronunciation}  label={'Transcription'}/>
        </View>
    )
}

export default connect(state => ({
    response: state.api.parsedDictionary
}))(FieldList)
