import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import RequestServiceInstance from '../../services/request.service';
import useRequest from '../../hooks/useRequest';
import { getAssetUrl } from '../../lib/lib';
import styles from './styled';

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
              <Image key={index} source={{ uri: `${getAssetUrl()}/${photo}` }} />
            ))}
          </View>
        </>
      )}
    </View>
  );
}
