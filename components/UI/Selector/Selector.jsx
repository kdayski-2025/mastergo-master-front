import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { selectorStyles } from './styled';
import SVGArrow from './icons/SVGArrow';
import { Colors } from '../../../shared/tokens';

const Selector = ({ options, selectedOption, onSelect, label }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [pressedOption, setPressedOption] = useState(null);

  const handleSelect = (value, visible) => {
    onSelect(value);
    setIsVisible(!visible);
    setPressedOption(null);
  };

  return (
    <View style={selectorStyles.container}>
      {label && <Text style={selectorStyles.lableStyle}>{label}</Text>}
      <TouchableOpacity
        style={[
          selectorStyles.trigger,
          isVisible && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: Colors.gray97,
          },
          !isVisible &&
            selectedOption && {
              backgroundColor: Colors.gray97,
              borderColor: 'transparent',
              boxShadow: '0 1px 6px 0 rgba(44, 44, 44, 0.15)',
            },
        ]}
        onPress={() => setIsVisible(!isVisible)}
      >
        <Text
          style={[
            selectorStyles.triggerText,
            selectedOption && selectorStyles.selectedTriggerText,
          ]}
        >
          {options.find((option) => option.id === selectedOption)?.name ||
            label}
        </Text>
        <SVGArrow
          style={{
            transform: [{ rotate: isVisible ? '180deg' : '0deg' }],
          }}
        />
      </TouchableOpacity>
      {isVisible && (
        <View style={selectorStyles.dropdown}>
          {options.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                selectorStyles.option,
                isVisible && {
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                },
              ]}
              activeOpacity={1}
              onPressIn={() => setPressedOption(item.id)}
              onPressOut={() => setPressedOption(null)}
              onPress={() => handleSelect(item.id, isVisible)}
            >
              <Text
                style={[
                  selectorStyles.optionText,
                  (item.id === selectedOption || item.id === pressedOption) &&
                    selectorStyles.pressedOptionText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default Selector;
