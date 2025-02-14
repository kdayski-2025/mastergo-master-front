import React from 'react';
import { View, Text } from 'react-native';

import styles from './styled';

export default function EmptyContent({ title, ...props }) {
  return (
    <View style={styles.empty} {...props}>
      <Text style={styles.message}>{title}Нет активных заказов</Text>
    </View>
  );
}
