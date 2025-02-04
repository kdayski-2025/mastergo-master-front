import React from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Gaps } from '../shared/tokens';

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
  const navigation = useNavigation();

  const handlePress = (id) => {
    navigation.navigate('ActiveDetails', { id });
  };

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
          <Pressable key={index} style={styles.card} onPress={() => handlePress(request.id)}>
            <Text style={styles.title}>Сантехник</Text>
            <Text style={styles.description}>{request.description}</Text>
            <Text style={styles.address}>{request.address}</Text>
            <Text style={styles.price}>2000р</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    height: 40,
    backgroundColor: 'transparent',
  },
  content: {
    flexGrow: 1,
    padding: Gaps.g12,
  },
  content_empty: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  message: {
    color: Colors.gray,
    fontSize: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: Gaps.g12,
    marginBottom: Gaps.g12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  description: {
    color: Colors.gray,
    marginBottom: 4,
  },
  address: {
    color: Colors.gray,
    marginBottom: 4,
  },
  price: {
    color: Colors.green,
    fontWeight: '500',
  },
});
