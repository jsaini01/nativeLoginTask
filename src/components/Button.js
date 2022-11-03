import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import React from 'react';

const Button = props => {
  const {text, onPress} = props;

  const handler = () => {
    onPress();
  };

  return (
    <TouchableHighlight onPress={handler} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1e90ff',
    width: '50%',
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: 'black',
    fontSize: 17,
    fontWeight: '500',
  },
});

export default Button;
