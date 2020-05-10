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
  WORD,
} from '../../constants/anki-constants';
import {sendField} from '../../actions/form-actions';
import {addNote} from '../../actions/createAnkiLanModel';

const FieldList = (props) => {
  const [pronunciation, setPronunciation] = useState(
    props.response.pronunciation,
  );
  const [sound, setSound] = useState();
  const [examples, setExamples] = useState();
  const [completedFields, setCompletedFields] = useState({
    word: props.word,
    compounded: [{pos: '', tr: '', definition: ''}, {}],
    examples: '',
    pronunciation: '',
    sound: '',
  });
  useEffect(() => {
    if (
      props.response.sound &&
      props.response.pronunciation &&
      props.response.compounded &&
      props.response.examples
    ) {
      // console.log("LOOOADED")
    } else {
    }
  });
  useEffect(() => {
    setSound(props.response.sound);
    setPronunciation(props.response.pronunciation);
    setExamples(props.response.examples);
    console.log('DPEDDDDD', props.response.compounded);
  }, [props]);
  const [loadingState, setLoadingState] = useState(false);
  useEffect(() => {
    // console.log('STATE', examples, pronunciation, sound);
    if (examples && pronunciation && sound) {
      setLoadingState(true);
    } else {
      setLoadingState(false);
    }
  });
  useEffect(() => {}, [pronunciation]);
  const submit = () => {
    props.setFields(props.fields);
  };
  return (
    <ScrollView keyboardShouldPersistTaps={'handled'} style={{height: '100%'}}>
      {loadingState && props.loadingState ? (
        <View>
          <PickerList labelNum={1} id={props.pos1id} role={DEF_LIST1} />
          {/*<PickerList labelNum={2} id={1} role={DEF_LIST2} />*/}
          <PickerList labelNum={2} id={props.pos2id} role={DEF_LIST2} />
          <FieldEditor
            hasChanged={(c) =>
              props.sendField({
                text: c,
                role: EXAMPLES,
              })
            }
            role={EXAMPLES}
            data={{
              label: 'Usage example',
              values: props.response.examples || ['can not find the example'],
            }}
          />
          <FieldEditor
            hasChanged={(c) =>
              props.sendField({
                text: c,
                role: SOUND,
              })
            }
            data={{values: [props.response.sound], label: 'Sound'}}
            role={SOUND}
          />
          <FieldEditor
            hasChanged={(c) =>
              props.sendField({
                text: c,
                role: PRONUNCIATION,
              })
            }
            role={PRONUNCIATION}
            data={{
              values: [props.response.pronunciation],
              label: 'Pronunciation',
            }}
          />
          <Button style={{marginTop: 10}} onPress={submit}>
            <Text>Submit</Text>
            <Icon name={'send'} />
          </Button>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
};
export default connect(
  (state) => ({
    response: state.api.parsedDictionary,
    word: state.api.availableApi.word,
    loadingState: state.api.apiIsLoaded,
    fields: state.anki.currentFields,
    pos1id: state.anki.pos1id,
    pos2id: state.anki.pos2id,
  }),
  {
    sendField,
    setFields,
  },
)(FieldList);
