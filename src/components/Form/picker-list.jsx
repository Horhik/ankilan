import React, {useState, useEffect, useRef} from 'react';
import {View} from 'native-base';
import {connect} from 'react-redux';
import PosPicker from './pos-picker';
import FieldEditor from './field-editor';
import {setDef} from '../../actions/anki-set-actions';
import {sendField} from '../../actions/form-actions';

/*
 ****************** props:*****************
 * startId props.data[0] / [1] /[8] ...
 * labelNum // Translate 1 / Translate 2 ...
 * */
const PickerList = props => {
  const [data, setData] = useState(props.data[props.id]);
  const [tr, setTr] = useState(props.data[props.id].definitions[0]);
  const [def, setDef] = useState(props.data[props.id].definitions[0]);
  const [pos, setPos] = useState(props.data[props.id].pos);
  const [globID, setId] = useState(props.id);
  useEffect(() => {
    setData(props.data[props.id]);
    setTimeout(() => {
      selectDef(0);
    }, 0);
  }, [props]);
  const selectDef = id => {
    setId(id);
    setPos(props.data[id].pos);
    setDef(props.data[id].definitions[0]);
    setTr(props.data[id].translates[0]);
  };

  useEffect(() => {
    props.sendField({
      text: {
        pos: pos,
        tr: tr,
        definition: def,
      },
      role: props.role,
    });
    props.sendField('HDFSL:FJL:SKDJF: SLDKJF:LSDJF:LSDKFJ SDF', {
      text: {
        pos: pos,
        tr: tr,
        definition: def,
      },
      role: props.role,
    });
  }, [tr, def, pos]);

  const updateData = c => {
    console.log('HDFLSDKFJ SDF', {
      text: {
        pos: pos,
        tr: tr,
        definition: def,
      },
      role: props.role,
    });
  };

  return (
    <View>
      <PosPicker
        labelNum={props.labelNum}
        defaultId={props.id}
        onSelect={id => selectDef(id | props.id)}
      />
      <FieldEditor
        hasChanged={c => {
          setTr(c);
          updateData(c);
        }}
        pos={pos}
        data={{
          label: `Translate ${props.labelNum}`,
          values: props.data[globID].translates,
        }}
      />
      <FieldEditor
        hasChanged={c => {
          setDef(c);
          updateData(c);
        }}
        pos={pos}
        data={{
          label: `Definition ${props.labelNum}`,
          values: props.data[globID].definitions,
        }}
      />
    </View>
  );
};
export default connect(
  state => ({
    data: state.api.parsedDictionary.compounded,
    word: state.api.availableApi.word,
  }),
  {
    setDef,
    sendField,
  },
)(PickerList);
