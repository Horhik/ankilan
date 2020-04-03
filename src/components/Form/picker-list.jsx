import React, {useState, useEffect, useRef} from 'react';
import {View} from 'native-base';
import {connect} from 'react-redux';
import PosPicker from './pos-picker';
import FieldEditor from './field-editor';

/*
 ****************** props:*****************
 * startId props.data[0] / [1] /[8] ...
 * labelNum // Translate 1 / Translate 2 ...
 * */
const PickerList = props => {
  const [data, setData] = useState({translates: [], definitions: []});
  useEffect(() => {
    console.log('PROPPPPS', props);
  });
  const setId = id => {
    console.log(id);
  };
  const selectDef = id => {
    console.log(props.data[id])
    setData(props.data[id])
  }
  return (
    <View>
      <PosPicker
        labelNum={props.labelNum}
        onSelect={id => selectDef(id)}
        // getId={id => setId(id)}
      />
      <FieldEditor data={{label:`Translate ${props.labelNum}`, values: data.translates}}/>
      <FieldEditor data={{label: `Definition ${props.labelNum}`, values: data.definitions}}/>
    </View>
  );
};
export default connect(state => ({
  data: state.api.parsedDictionary.compounded,
}))(PickerList);
