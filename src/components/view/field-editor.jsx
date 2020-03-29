import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {Text, Button, Picker} from 'native-base';
import TextField from 'react-native-material-textfield/src/components/field';
import {View} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet} from 'react-native';
/* Props
 * defaultText
 * variants
 * label
 * */
const FieldEditor = props => {
  const input = useRef();
  const [edit, toggleEdit] = useState(false);
  const [variants, setVariants] = useState([]);
  const [label, setLabel] = useState('');
  const [value, setValue] = useState(props.variants[0] || '');
  const [editableText, setEditableText] = useState(props.defaultText);
  useEffect(() => {
    setVariants(props.variants);
    setLabel(props.label);
    setEditableText(props.variants[0]);
  }, []);

  const toggle = () => {
    toggleEdit(!edit);
    setTimeout(() => {
      if (input.current) {
        input.current.focus();
      }
    }, 0);
  };

  const selectValue = value => {
    console.log(value);
    alert(value);

    setEditableText(value);
    setValue(value);
  };
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerWrap}>
        <View style={styles.inner}>
          {edit ? (
            <TextField
              value={editableText}
              style={styles.textField}
              ref={input}
              multiline={true}
            />
          ) : (
            <Picker
              style={styles.picker}
              onValueChange={value => selectValue(value)}
              selectedValue={value}>
              {variants.map((variant, index) => (
                <Picker.Item
                  label={variant}
                  value={variant}
                  key={index}
                  id={index}
                />
              ))}
            </Picker>
          )}
        </View>
        <Button style={styles.button} onPress={toggle}>
          {edit ? (
            <Icon name="caret-down" size={20} color={'white'} />
          ) : (
            <Icon name="pen" size={20} color={'white'} />
          )}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerWrap: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 10,
    width: '12%',
  },
  picker: {
    height: '100%',
    display: 'flex',
    marginLeft: 4,
    // backgroundColor: '#00000010',
  },
  wrap: {
    margin: 0,
  },
  textField: {
    paddingLeft: 12,
  },
  inner: {
    width: '85%',
    height: 65,
  },
  label: {
    paddingLeft: 10,
    marginBottom: -10,
  },
});

export default connect(state => ({}), null)(FieldEditor);
