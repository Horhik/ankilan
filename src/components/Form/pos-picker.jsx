import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View} from 'native-base';
import FieldEditor from './field-editor';
import {POS_PICKER} from '../../constants/component-types';

const PosPicker = props => {
  const [ready, setReady] = useState(false);
  const [poses, setPoses] = useState([]);
  useEffect(() => {
    if (props.parts) {
      console.log('PARTASSDFSD', props.defaultId)
      let posArray = props.parts.map((part, id) => part.pos);
      setPoses(posArray);
      setReady(true);
    }
  }, [props]);
  return (
    <View>
      {ready ? (
        <FieldEditor
          data={{
            label: `Part of speech ${props.labelNum} `,
            values: poses,
          }}
          id={props.defaultId}
          type={POS_PICKER}
          hasChanged={value => props.onSelect(value)}
        />
      ) : (
        <View />
      )}
    </View>
  );
};
export default connect(state => ({
  parts: state.api.parsedDictionary.compounded,
}))(PosPicker);
