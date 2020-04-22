import React, {useEffect, useState} from 'react';
import TextField from 'react-native-material-textfield/src/components/field';
import {ScrollView, StyleSheet} from 'react-native';
import {Picker, Text, View} from 'native-base';
import IconedButton from '../view/iconed-button.jsx';
import {POS_PICKER} from '../../constants/component-types';
import set from '@babel/runtime/helpers/esm/set';

const FieldEditor = props => {
  const label = props.data.label;
  const constantValues = props.pos | '';
  const [values, setValues] = useState(props.data.values);
  const [editingValue, setEditingValue] = useState(
    props.data.values[props.id] || props.data.values[0],
  );
  const [selectedValue, setSelectedValue] = useState(
    props.data.values[props.id] || props.data.values[0],
  );
  const [finiteValue, setFiniteValue] = useState(
    props.data.values[props.id] || props.data.values[0],
  );
  const [editing, isEditing] = useState(false);
  const [] = useState();
  const [] = useState();
  const [] = useState();

  const select = value => {
    setSelectedValue(value);
    setFiniteValue(value);
    setEditingValue(value);
  };

  const typing = text => {
    setEditingValue(text);
  };

  const setTyped = () => {
    try {
      let valuesSet = new Set(values);
      valuesSet.add(editingValue);
      const valuesArray = Array.from(valuesSet).slice();
      setValues(valuesArray);
      isEditing(!editing);
      if (selectedValue !== editingValue) {
        select(valuesArray[valuesArray.length - 1]);
      }
    } catch (e) {
      console.log('error in field-editor.jsx', e);
    }
  };

  useEffect(() => {
    if (props.type === POS_PICKER) {
      values.forEach((value, id) => {
        if (value === finiteValue) {
          props.hasChanged(id);
        }
      });
    } else {
      props.hasChanged(finiteValue);
    }
  }, [finiteValue]);
  useEffect(() => {
    setValues(props.data.values);
    setSelectedValue(props.data.values[0]);
    console.log('EXECUTIN');
  }, [constantValues]);

  // useEffect(() => {
  //
  //   if(props.type !== POS_PICKER){
  //     if(constantValues !== props.data.values){
  //       console.log("EXECUTIN")
  //     }
  //   }
  // }, [constantValues, props.data.values])

  const styles = StyleSheet.create({
    wrapper: {},
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 90,
    },
    button: {
      width: 40,
      height: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tfWrapper: {
      width: editing ? '75%' : '84%',
    },
    pickerLabel: {
      color: '#00000050',
      fontSize: 12,
      marginLeft: 2,
    },
    hr: {
      height: 1,
      width: '100%',
      backgroundColor: '#00000070',
    },
  });

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      {props.type === POS_PICKER ? (
        <View>
          <Text style={styles.pickerLabel}>{props.data.label}</Text>
          <Picker
            selectedValue={selectedValue}
            onValueChange={value => select(value)}>
            {values.map((value, id) => {
              return <Picker.Item value={value} label={value} key={id} />;
            })}
          </Picker>
        </View>
      ) : (
        <View style={styles.wrapper}>
          <View style={styles.inner}>
            <View style={styles.tfWrapper}>
              {editing ? (
                <View>
                  <TextField
                    lineType={'none'}
                    multiline={true}
                    label={label}
                    value={editingValue}
                    editable={true}
                    onChangeText={text => typing(text)}
                    autoFocus={true}
                  />
                  <View style={styles.hr} />
                </View>
              ) : (
                <View>
                  <Text style={styles.pickerLabel}>{props.data.label}</Text>
                  <Picker
                    selectedValue={selectedValue}
                    onValueChange={value => select(value)}>
                    {values.map((value, id) => {
                      return (
                        <Picker.Item value={value} label={value} key={id} />
                      );
                    })}
                  </Picker>
                </View>
              )}
            </View>
            {editing ? (
              <View style={styles.row}>
                <IconedButton icon="check" onPress={setTyped} />
                <IconedButton
                  icon="caret-down"
                  onPress={() => {
                    isEditing(!editing);
                    setEditingValue(selectedValue);
                  }}
                />
              </View>
            ) : (
              <IconedButton
                icon="pen"
                onPress={() => {
                  isEditing(!editing);
                }}
              />
            )}
          </View>
          <View style={styles.hr} />
        </View>
      )}
    </ScrollView>
  );
};
export default FieldEditor;
