import { useNavigation } from '@react-navigation/native';
import React from 'react';
import SvgBack from './svg/SVGBack';
import styles from './styled';
import { Text, TouchableOpacity } from 'react-native';

const Back = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
      <SvgBack />
      <Text style={styles.text}>Назад</Text>
    </TouchableOpacity>
  );
};

export default Back;
