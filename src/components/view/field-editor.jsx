import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
<<<<<<< HEAD
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
=======

import TextField from 'react-native-material-textfield/src/components/field';
import {StyleSheet} from 'react-native';
import {View, Text, Button, Picker} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconedButton from './iconed-button.jsx';
const FieldEditor = props => {
	const [data, setData] = useState({});
	const [editing, setEditing] = useState(true);
	const label = props.data.label;
	const [selectedValue, setSelectedValue] = useState(
		props.data.values[0],
	);
				const [userTyped, setUserTyped] = useState('');
	const input = useRef();
	useEffect(() => {
		setData(props.data);
	}, []);

	const selectValue = value => {
		setSelectedValue(value);
	};
	const typing = text => {
					setUserTyped(text)
	};
				const confirmTyped = () => {
								const values = data.values
								setData({...data, values: [...values, userTyped]})
				}

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
	});

	return (
		<View style={styles.wrapper}>
			<Text>{label}</Text>
			<View style={styles.inner}>
				<View style={styles.tfWrapper}>
					{editing ? (
						<TextField
							multiline={true}
							label={data.type}
							value={selectedValue}
							ref={input}
							onChangeText={text =>
								typing(text)
							}
						/>
					) : (
						<Picker
							selectedValue={
								selectedValue
							}
							onValueChange={value =>
								selectValue(
									value,
								)
							}>
							{data.values.map(
								(value, id) => {
									return (
										<Picker.Item
											value={
												value
											}
											label={
												value
											}
											key={
												id
											}
										/>
									);
								},
							)}
						</Picker>
					)}
				</View>
				{editing ? (
					<View style={styles.row}>
						<IconedButton
							icon="caret-down"
							onPress={() => {
								setEditing(
									!editing,
								);
							}}
						/>
						<IconedButton
							icon="check"
							onPress={confirmTyped}
						/>
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
		</View>
	);
};
export default connect()(FieldEditor);
>>>>>>> fixed
