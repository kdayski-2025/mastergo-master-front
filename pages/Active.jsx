import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ActiveScreen() {
  return (
    <View style={styles.container}>
      <Text>Active</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
