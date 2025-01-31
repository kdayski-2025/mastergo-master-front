import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Alert } from 'react-native';
import { Colors, Gaps } from '../shared/tokens';
import Button from './Button';
import LoginServiceInstance from '../services/login.service';
import UserServiceInstance from '../services/user.service';

export default function PhoneNumberInput({ setSubmitted }) {
  const [phoneNumber, setPhoneNumber] = useState('+7 (777) 777-77-77');

  const formatPhoneNumber = (input) => {
    const cleaned = input.replace(/\D/g, '');

    const match = cleaned.match(/^(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (!match) return cleaned;

    const [, countryCode, areaCode, prefix, firstPart, secondPart] = match;

    if (secondPart) {
      return `+${countryCode} (${areaCode}) ${prefix}-${firstPart}-${secondPart}`;
    } else if (firstPart) {
      return `+${countryCode} (${areaCode}) ${prefix}-${firstPart}`;
    } else if (prefix) {
      return `+${countryCode} (${areaCode}) ${prefix}`;
    } else if (areaCode) {
      return `+${countryCode} (${areaCode}`;
    } else if (countryCode) {
      return `+${countryCode}`;
    }
    return '';
  };

  const handleInputChange = (text) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  const handleSubmit = async () => {
    const isValid = phoneNumber.replace(/\D/g, '').length === 11 && phoneNumber.startsWith('+7');
    if (isValid) {
      await LoginServiceInstance.set({ phone: phoneNumber });
      await UserServiceInstance.get({ phone: phoneNumber });
      setSubmitted(true);
    } else {
      Alert.alert(
        'Phone Number',
        'Invalid phone number. Please enter a valid number in the format +7 (XXX) XXX-XX-XX.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={handleInputChange}
        placeholder="+7 (XXX) XXX-XX-XX"
        keyboardType="numeric"
        maxLength={18}
      />
      <Button text="Продолжить" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    gap: Gaps.g40,
  },
  input: {
    height: 50,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    fontSize: 18,
  },
});
