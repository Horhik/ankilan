import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
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
