import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Colors } from '../../shared/tokens';
import { pinCodeStyles } from './styled';

export default function PincodeInput({ length = 4, onComplete }) {
  const [code, setCode] = useState(new Array(length).fill(''));
  const inputs = [];

  const handleChange = (text, index) => {
    const updatedCode = [...code];
    updatedCode[index] = text.slice(-1);
    setCode(updatedCode);

    if (text && index < length - 1) {
      inputs[index + 1]?.focus();
    }

    if (updatedCode.every((char) => char !== '')) {
      onComplete && onComplete(updatedCode.join(''));
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      const updatedCode = [...code];
      if (code[index] === '' && index > 0) {
        inputs[index - 1]?.focus();
        updatedCode[index - 1] = '';
      } else {
        updatedCode[index] = '';
      }
      setCode(updatedCode);
    }
  };

  return (
    <View style={pinCodeStyles.box}>
      {code.map((value, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs[index] = ref)}
          style={{
            ...pinCodeStyles.input,
            backgroundColor: value ? Colors.success : Colors.error,
          }}
          keyboardType="numeric"
          maxLength={1}
          value={value}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
}
