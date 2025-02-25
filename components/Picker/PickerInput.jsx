import React, { useState } from 'react';
import { View } from 'react-native';
import { Colors } from '../../shared/tokens';
import { input } from './styled';
import { Picker } from '@react-native-picker/picker';

export default function PickerInput({ placeholder, onValueChange, options, ...props }) {
  const [valueSet, setValueSet] = useState(null);

  const onChange = (value) => {
    setValueSet(Number(value));
    if (Number(value)) onValueChange(value);
    else onValueChange(null);
  };

  return (
    <View style={input.input}>
      <Picker
        style={{
          ...input.placeholder,
          color: valueSet ? Colors.black : Colors.gray,
        }}
        dropdownIconColor={Colors.gray}
        mode="dialog"
        onValueChange={onChange}
        {...props}
      >
        <Picker.Item label={placeholder} value={'0'} style={input['placeholder-text']} />
        {options.map((type) => (
          <Picker.Item key={type.id} label={type.name} value={type.id} />
        ))}
      </Picker>
    </View>
  );
}
