import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Colors, Gaps } from '../shared/tokens';
import LoginServiceInstance from '../services/login.service';

export default function PincodeScreen({ length = 4, navigation }) {
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

  const onComplete = async (code) => {
    await LoginServiceInstance.set({ code });
    navigation.navigate('Register');
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
    <View style={styles.container}>
      <Text style={styles.title}>Придумайте код{'\n'}для входа в приложение</Text>
      <View style={styles.box}>
        {code.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs[index] = ref)}
            style={{ ...styles.input, backgroundColor: value ? Colors.yellow : Colors.gray }}
            keyboardType="numeric"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            autoFocus={index === 0}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 48,
    flex: 1,
    gap: Gaps.g40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  box: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    width: 20,
    height: 20,
    borderRadius: 45,
    marginHorizontal: 10,
  },
});
