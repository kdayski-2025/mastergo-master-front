import React, { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Text, View, ScrollView } from 'react-native';

import RequestsServiceInstance from '../../services/requests.service';
import styles from './styled';
import UICard from '../../components/UI/Card/Card';
import useRequests from '../../hooks/useRequests';
import EmptyContent from '../../components/EmptyContent/EmptyContent';
import Map from '../../components/Map/Map';
import Loader from '../../components/Loader/Loader';
import Container from '../../components/UI/Container/Container';
import Back from '../../components/UI/Back/Back';

export default function RequestsScreen() {
  const navigation = useNavigation();
  const { requests, loading } = useRequests();
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
      const fetchData = () => {
        RequestsServiceInstance.get({ status: 'open' });
      };

      fetchData();
      // const interval = setInterval(fetchData, 10000);
      // return () => {
      // clearInterval(interval);
      // };
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <Back marginBottom={0} />
      </View>
      <Map target={target} setMapLoading={setMapLoading} />
      <ScrollView contentContainerStyle={styles.content}>
        {!requests.length > 0 ? (
          <EmptyContent title={'Нет активных заказов'} />
        ) : !loading ? (
          requests.map((request, index) => (
            <UICard
              key={index}
              onPress={() => handlePress(request)}
              cardData={{
                title: request.masterType.name,
                description: request.description,
                where: request.description,
                price: request.price,
                adress: request.address,
              }}
              state={active === request.id ? 'target' : 'default'}
            />
          ))
        ) : (
          <Loader />
        )}
      </ScrollView>
    </View>
  );
}
