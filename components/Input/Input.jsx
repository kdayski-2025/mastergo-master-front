import React from 'react';
import { TextInput } from 'react-native';
import { inputStyles } from './styled';

export default function Input(props) {
  return <TextInput style={inputStyles.input} {...props} />;
}
