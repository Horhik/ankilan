import React, {useEffect, useRef, useState} from 'react';
import TextField from 'react-native-material-textfield/src/components/field';
import {StyleSheet} from 'react-native';
import {Picker, Text, View} from 'native-base';
import IconedButton from '../view/iconed-button.jsx';
import {POS_PICKER} from '../../constants/component-types';

const FieldEditor = props => {
  const [data, setData] = useState(props.data);
  const [values, setValues] = useState(props.data.values);
  const [editing, setEditing] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    props.data.values[props.id] || props.data.values[0],
  );
  const [userText, setUserText] = useState(
    props.data.values[props.id] || props.data.values[0],
  );
  const [valuesUpdated, setValuesUpdated] = useState(false);
  const input = useRef();
  useEffect(() => {
    // console.log(userText)
    //   console.log("SELECTED", selectedValue)
    if (props.hasChanged) {
      // console.log("HAS CHANGED")
      props.hasChanged(selectedValue);
    }
    if (props.type === POS_PICKER) {
      console.log(userText);
    }
  });
  useEffect(() => {
    if (props.data.values.length === values.length) {
      setData(props.data);
      setValues(props.data.values);
    }
  }, [props.data.values]);

  const selectValue = selected => {
    setSelectedValue(selected);
    if (props.type === POS_PICKER) {
      values.forEach((value, id) => {
        if (value === selected) {
          console.warn(id);
          props.onSelect(id);
        }
      });
    }
  };
  const typing = text => {
    setUserText(text);
  };
  const select = value => {
    setUserText(value);
    selectValue(value);
  };
  const confirmTyped = () => {
    let newValues = new Set(values);
    const valuesArray = Array.from(newValues.add(userText));
    setValues(valuesArray);
    setData({...data, values: valuesArray});
    setEditing(!editing);
    if (valuesArray.length !== values.length) {
      setValuesUpdated(true);
    }
  };

  useEffect(() => {
    if (valuesUpdated) {
      setSelectedValue(values[values.length - 1]);
      setUserText(values[values.length - 1]);
      setValuesUpdated(false);
    }
    setValuesUpdated(false);
  }, [valuesUpdated]);
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
    <View style={styles.wrapper}>
      <View style={styles.inner}>
        <View style={styles.tfWrapper}>
          {editing ? (
            <TextField
              lineType={'none'}
              multiline={true}
              label={props.data.label}
              value={userText}
              editable={true}
              ref={input}
              onChangeText={text => typing(text)}
            />
          ) : (
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
          )}
        </View>
        {editing ? (
          <View style={styles.row}>
            <IconedButton
              icon="caret-down"
              onPress={() => {
                setEditing(!editing);
                setUserText(selectedValue);
              }}
            />
            <IconedButton icon="check" onPress={confirmTyped} />
          </View>
        ) : (
          <IconedButton
            icon="pen"
            onPress={() => {
              setEditing(!editing);
            }}
          />
        )}
      </View>
      <View style={styles.hr} />
    </View>
  );
};
export default FieldEditor;
