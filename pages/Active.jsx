import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../shared/tokens';

export default function ActiveScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.message}>Нет активных заказов</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    height: 20,
    backgroundColor: 'transparent',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  message: {
    color: Colors.gray,
    fontSize: 16,
  },
});
