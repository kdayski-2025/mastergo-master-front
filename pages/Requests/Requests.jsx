import React, { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Text, View, ScrollView } from 'react-native';

import RequestsServiceInstance from '../../services/requests.service';
import styles from './styled';
import Card from '../../components/Card/Card';
import useRequests from '../../hooks/useRequests';
import EmptyContent from '../../components/EmptyContent/EmptyContent';
import Map from '../../components/Map/Map';

export default function RequestsScreen() {
  const navigation = useNavigation();
  const { requests } = useRequests();
  const [target, setTarget] = useState(null);
  const [active, setActive] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);

  const handlePress = (request) => {
    if (!mapLoading) {
      setTarget({
        coords: {
          latitude: request.latitude,
          longitude: request.longitude,
        },
      });
      if (active === request.id) {
        navigation.navigate('RequestDetails', { id: request.id });
      } else {
        setActive(request.id);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      RequestsServiceInstance.get();
      return () => {};
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <Map target={target} setMapLoading={setMapLoading} />
      <ScrollView contentContainerStyle={styles.content}>
        {!requests ? (
          <EmptyContent title={'Нет активных заказов'} />
        ) : (
          requests.map((request, index) => (
            <Card key={index} onPress={() => handlePress(request)} state={active === request.id ? 'target' : 'default'}>
              <Text type={'title'}>{request.masterType.name}</Text>
              <Text type={'description'}>{request.description}</Text>
              <Text type={'description'}>{request.address}</Text>
              <Text type={'description'}>{request.requestType}</Text>
              {request.price ? <Text type={'price'}>{request.price}р</Text> : <></>}
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
}
