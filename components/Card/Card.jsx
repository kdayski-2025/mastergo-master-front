import React from 'react';
import { Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styled';

export default function Card({ index, title = 'Сантехник', description, address, type, id, price = 2000 }) {
  const navigation = useNavigation();

  //   type'ActiveDetails'
  const handlePress = (id) => {
    navigation.navigate(type, { id });
  };
  return (
    <Pressable style={styles.card} onPress={() => handlePress(id)}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.address}>{address}</Text>
      <Text style={styles.price}>{price}р</Text>
    </Pressable>
  );
}
