import React, { useState, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Text, View, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import RequestsServiceInstance from '../../services/requests.service';
import styles from './styled';
import Card from '../../components/Card/Card';
import useRequests from '../../hooks/useRequests';

export default function NewScreen() {
  const navigation = useNavigation();
  const { requests } = useRequests();
  const [location, setLocation] = useState(null);

  const handlePress = (id) => {
    navigation.navigate(type, { id });
  };

  useFocusEffect(
    React.useCallback(() => {
      RequestsServiceInstance.get();
      return () => {};
    }, [])
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <ScrollView contentContainerStyle={styles.content}>
        {location && (
          <MapView
            style={{ height: '70%', width: '100%', marginBottom: 16 }}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            />
          </MapView>
        )}
        {!requests.length && (
          <View style={styles['content-empty']}>
            <Text style={styles.message}>Нет активных заказов</Text>
          </View>
        )}
        {requests.map((request, index) => (
          <Card onPress={() => handlePress(id)} key={index}>
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
