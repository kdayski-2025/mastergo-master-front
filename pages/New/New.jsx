import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, ScrollView } from 'react-native';

import RequestsServiceInstance from '../../services/requests.service';
import styles from './styled';
import Card from '../../components/Card/Card';
import useRequests from '../../hooks/useRequests';

export default function NewScreen() {
  const { requests } = useRequests();

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
        {!requests.length && (
          <View style={styles['content-empty']}>
            <Text style={styles.message}>Нет активных заказов</Text>
          </View>
        )}
        {requests.map((request, index) => (
          <Card
            key={index}
            index={index}
            description={request.description}
            address={request.address}
            type={'NewDetails'}
            id={request.id}
          />
        ))}
      </ScrollView>
    </View>
  );
}
