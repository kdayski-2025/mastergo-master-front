import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { menu } from './styled';
import { Picker } from '@react-native-picker/picker';

export default function PickerMenu({ options, ...props }) {
  const pickerRef = React.useRef(null);

  const handleIconPress = () => {
    pickerRef.current?.focus();
  };

  return (
    <View style={menu.input}>
      <TouchableOpacity onPress={handleIconPress} style={menu['icon-wrapper']}>
        <Text style={menu.icon}>⭐</Text>
      </TouchableOpacity>
      <Picker ref={pickerRef} style={menu.placeholder} mode="dialog" {...props}>
        {options.map((type) => (
          <Picker.Item key={type.id} label={type.name} value={type.id} />
        ))}
      </Picker>
    </View>
  );
}
