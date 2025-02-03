import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useRequest from '../hooks/useRequest';
import RequestServiceInstance from '../services/request.service';
import { useFocusEffect } from '@react-navigation/native';

export default function NewScreen() {
  const { requests } = useRequest();

  useFocusEffect(
    React.useCallback(() => {
      RequestServiceInstance.get();
      return () => {};
    }, [])
  );

  return (
    <View style={styles.container}>
      {requests.map((request, index) => (
        <View key={index}>
          <Text>{request.address}</Text>
        </View>
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
