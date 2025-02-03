import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import RequestServiceInstance from '../services/request.service';
import useRequest from '../hooks/useRequest';
import { Colors } from '../shared/tokens';

export default function ActiveDetailsScreen({ route }) {
  const { id } = route.params;
  const { request } = useRequest();

  useEffect(() => {
    if (id) {
      RequestServiceInstance.get(id);
    }
  }, [id]);

  return (
    <View style={styles.container}>
      {request && (
        <>
          <View>
            <Text>Сантехник</Text>
            <Text>{request.description}</Text>
            <Text>{request.address}</Text>
          </View>
          <View>
            {request.photos?.map((photo, index) => (
              <Image key={index} source={{ uri: photo }} />
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
  },
});
