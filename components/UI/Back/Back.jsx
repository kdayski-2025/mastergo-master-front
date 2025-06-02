import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styles from './styled';
import { Text, TouchableOpacity } from 'react-native';
import BackIcon from '../../../assets/icons/back.svg';

const Back = ({ marginBottom }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{ ...styles.back, marginBottom }} onPress={() => navigation.goBack()}>
      <BackIcon />
      <Text style={styles.text}>Назад</Text>
    </TouchableOpacity>
  );
};

export default Back;
