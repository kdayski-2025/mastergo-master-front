import React, { useState } from 'react';
import { TextInput, View, Text, Pressable } from 'react-native';
import { inputStyles } from './styled';
import SVGMap from '../../../assets/icons/SVGmap';
import SVGFile from '../../../assets/icons/SVGFile';

export default function Input({
  label,
  disabled,
  error,
  onMapPress,
  onFile,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(
    !!(props.value && props.value.length > 0)
  );

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => {
    setIsFocused(false);
    if (props.value && props.value.length > 0) {
      setHasText(true);
    } else {
      setHasText(false);
    }
  };

  const inputStyle = [
    inputStyles.input,
    onFile && inputStyles.onFile,
    isFocused && inputStyles.focused,
    !isFocused && hasText && inputStyles.hasText,
    disabled && inputStyles.disabled,
    error && inputStyles.error,
  ];

  const lableStyle = [inputStyles.label, disabled && inputStyles.disableLabel];
  return (
    <View>
      {label && <Text style={lableStyle}>{label}</Text>}
      <Pressable onPress={onFile} style={inputStyles.inputWrapper}>
        {onMapPress && (
          <SVGMap
            style={{
              position: 'absolute',
              right: '10',
              top: '50%',
              transform: [{ translateY: '-50%' }],
              zIndex: 2,
            }}
            onPress={onMapPress}
          />
        )}
        {typeof onFile === 'function' && (
          <SVGFile
            style={{
              position: 'absolute',
              left: '13',
              top: '50%',
              transform: [{ translateY: '-50%' }],
              zIndex: 2,
            }}
            onPress={onFile}
          />
        )}
        <TextInput
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!(disabled || onFile)}
          {...props}
        />
      </Pressable>
      {error && <Text style={inputStyles.errorText}>{error}</Text>}
    </View>
  );
}
