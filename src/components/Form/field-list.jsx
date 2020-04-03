import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Icon, Button, Text} from 'native-base';
import {TextField} from 'react-native-material-textfield';
import FieldEditor from './field-editor';
import TextInput from './text-input';
import {ScrollView} from 'react-native';
import PickerList from './picker-list';
import {setFields} from '../../actions/anki-set-actions';
import {
  DEF_LIST1,
  DEF_LIST2,
  EXAMPLES,
  PRONUNCIATION,
  SOUND,
} from '../../constants/anki-constants';

const FieldList = props => {
  const [pronunciation, setPronunciation] = useState();
  const [sound, setSound] = useState();
  const [examples, setExamples] = useState(props.response.examples);
  const [completedFields, setCompletedFields] = useState({
    word: props.word,
    compounded: [{pos: '', tr: '', definition: ''}, {}],
    examples: '',
    pronunciation: '',
    sound: '',
  });
  useEffect(() => {
    setSound(props.response.sound);
    setPronunciation(props.response.pronunciation);
    setExamples(props.response.examples);
  }, [props]);
  useEffect(() => {
    console.group('STATE', examples, pronunciation, sound);
  });
  const submit = () => {
    setFields(completedFields);
  };
  return (
    <ScrollView style={{height: '100%'}}>
      <PickerList labelNum={1} id={0} role={DEF_LIST1} />
      <PickerList labelNum={2} id={1} role={DEF_LIST2} />
      <FieldEditor
        role={EXAMPLES}
        data={{
          label: 'Usage example',
          values: examples || ['can not find the example'],
        }}
      />
      <TextInput value={sound} label={'Sound'} role={SOUND} />
      <TextInput
        value={pronunciation}
        label={'Transcription'}
        role={PRONUNCIATION}
      />
      <Button style={{marginTop: 10}} onPress={submit}>
        <Text>Submit</Text>
        <Icon name={'send'} />
      </Button>
    </ScrollView>
  );
};

export default connect(state => ({
  response: state.api.parsedDictionary,
  word: state.api.word,
}))(FieldList);
