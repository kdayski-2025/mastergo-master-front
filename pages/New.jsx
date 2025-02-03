import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import useRequests from '../hooks/useRequests';
import RequestsServiceInstance from '../services/requests.service';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Colors, Gaps } from '../shared/tokens';

export default function NewScreen() {
  const { requests } = useRequests();
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      RequestsServiceInstance.get();
      return () => {};
    }, [])
  );

  const handlePress = (id) => {
    navigation.navigate('NewDetails', { id });
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
    height: 20,
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
