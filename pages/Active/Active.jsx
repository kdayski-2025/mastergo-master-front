import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import { styles } from './styled';

import CardOrder from '../../components/CardOrder/CardOrder';

export default function ActiveScreen() {
  const requests = [
    {
      id: '8ebf0a86-a330-4705-9706-7712b0e71963',
      internalId: 6,
      address: 'Москва, ул. Пушкина, д.10 сперма',
      latitude: 11,
      longitude: 11,
      masterType: 1,
      description: 'Протечка крана на кухне',
      photos: ['1738578360002_photo_2024-11-14_13-37-11.jpg'],
      requestType: 'auction',
      status: 'open',
      createdAt: '2025-02-03T10:26:00.061Z',
      updatedAt: '2025-02-03T10:26:00.061Z',
      userId: 1,
    },
    {
      id: '8ebf0a86-a330-4705-9706-7712b0e71963',
      internalId: 6,
      address: 'Москва, ул. Пушкина, д.10 сперма',
      latitude: 11,
      longitude: 11,
      masterType: 1,
      description: 'Протечка крана на кухне',
      photos: ['1738578360002_photo_2024-11-14_13-37-11.jpg'],
      requestType: 'auction',
      status: 'open',
      createdAt: '2025-02-03T10:26:00.061Z',
      updatedAt: '2025-02-03T10:26:00.061Z',
      userId: 1,
    },
    {
      id: '8ebf0a86-a330-4705-9706-7712b0e71963',
      internalId: 6,
      address: 'Москва, ул. Пушкина, д.10 сперма',
      latitude: 11,
      longitude: 11,
      masterType: 1,
      description: 'Протечка крана на кухне',
      photos: ['1738578360002_photo_2024-11-14_13-37-11.jpg'],
      requestType: 'auction',
      status: 'open',
      createdAt: '2025-02-03T10:26:00.061Z',
      updatedAt: '2025-02-03T10:26:00.061Z',
      userId: 1,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <ScrollView contentContainerStyle={styles.content}>
        {!requests.length && (
          <View style={styles.content_empty}>
            <Text style={styles.message}>Нет активных заказов</Text>
          </View>
        )}
        {requests.map((request, index) => (
          <CardOrder
            key={index}
            index={index}
            description={request.description}
            address={request.address}
            type={'ActiveDetails'}
            id={request.id}
          />
        ))}
      </ScrollView>
    </View>
  );
}
