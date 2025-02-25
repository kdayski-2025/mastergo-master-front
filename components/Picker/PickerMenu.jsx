import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
        <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>
      <Picker ref={pickerRef} style={menu.placeholder} mode="dialog" {...props}>
        {options.map((type) => (
          <Picker.Item key={type.id} label={type.name} value={type.id} />
        ))}
      </Picker>
    </View>
  );
}
