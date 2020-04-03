import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import TextField from 'react-native-material-textfield/src/components/field';
import {StyleSheet, TextInput} from 'react-native';
import {View, Text, Button, Picker} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconedButton from '../view/iconed-button.jsx';
import {POS_PICKER} from '../../constants/component-types';
const FieldEditor = props => {
  const [data, setData] = useState({});
  const [editing, setEditing] = useState(false);
  const label = props.data.label;
  const [selectedValue, setSelectedValue] = useState(props.data.values[0]);
  const [userTyped, setUserTyped] = useState('');
  const input = useRef();
  useEffect(() => {
    setData(props.data);
    console.log(props.data)
  }, []);

  const selectValue = selected => {
    setSelectedValue(selected);
    if(props.type === POS_PICKER){
      data.values.forEach((value, id) => {
        if(value === selected)
        props.onSelect(id)
      })
    }
  };
  const typing = text => {
    console.log(text);
    setUserTyped(text);
  };
  const confirmTyped = () => {
    const values = data.values;
    setData({...data, values: [...values, userTyped]});
  };

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

              value={selectedValue}
              editable={true}
              ref={input}
              onChangeText={text => typing(text)}
            />
          ) : (
            <View>
              <Text style={styles.pickerLabel}>{props.data.label}</Text>
              <Picker
                selectedValue={selectedValue}
                onValueChange={value => selectValue(value)}>
                {props.data.values.map((value, id) => {
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
export default connect()(FieldEditor);
