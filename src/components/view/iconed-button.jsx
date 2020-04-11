import React, {useState} from 'react';

import TextField from 'react-native-material-textfield/src/components/field';
import {StyleSheet} from 'react-native';
import {View, Text, Button, Picker} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

const IconedButton = props => {
  return (
    <Button bordered style={styles.button} onPress={props.onPress}>
      <Icon name={props.icon} size={20} color={'blue'} />
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconedButton;
