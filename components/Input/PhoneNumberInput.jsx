import React, { useState } from 'react';
import { TextInput, View, Alert } from 'react-native';

import Button from '../Button/Button';
import LoginServiceInstance from '../../services/login.service';

import { phoneNumberInputStyles } from './styled';

export default function PhoneNumberInput({ value, onChangeText, placeholder, ...props }) {
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
    onChangeText(formatted);
  };

  return (
    <TextInput
      style={phoneNumberInputStyles.input}
      value={value}
      onChangeText={handleInputChange}
      placeholder={placeholder}
      keyboardType="numeric"
      maxLength={18}
    />
  );
}
