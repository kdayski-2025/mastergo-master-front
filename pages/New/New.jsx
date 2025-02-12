import React, { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Text, View, ScrollView } from 'react-native';

import RequestsServiceInstance from '../../services/requests.service';
import styles from './styled';
import Card from '../../components/Card/Card';
import useRequests from '../../hooks/useRequests';
import EmptyContent from '../../components/EmptyContent/EmptyContent';
import Map from '../../components/Map/Map';

export default function NewScreen() {
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
        navigation.navigate('NewDetails', { id: request.id });
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
      <ScrollView contentContainerStyle={styles.content}>
        <Map target={target} setMapLoading={setMapLoading} />
        {!requests.length && <EmptyContent title={'Нет активных заказов'} />}
        {requests.map((request, index) => (
          <Card key={index} onPress={() => handlePress(request)} state={active === request.id ? 'target' : 'default'}>
            <Text type={'title'}>masterType: {request.masterType}</Text>
            <Text type={'description'}>{request.description}</Text>
            <Text type={'description'}>{request.address}</Text>
            <Text type={'price'}>2000р</Text>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
