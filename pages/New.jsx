import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import useRequests from '../hooks/useRequests';
import RequestsServiceInstance from '../services/requests.service';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function NewScreen() {
  const { requests } = useRequests();
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      RequestsServiceInstance.get();
      return () => {};
    }, [])
  );

  const handlePress = (id) => {
    navigation.navigate('NewDetails', { id });
  };

  return (
    <View style={styles.container}>
      {requests.map((request, index) => (
        <Pressable key={index} onPress={() => handlePress(request.id)}>
          <Text>Сантехник</Text>
          <Text>{request.description}</Text>
          <Text>{request.address}</Text>
          <Text>2000р</Text>
        </Pressable>
      ))}
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
