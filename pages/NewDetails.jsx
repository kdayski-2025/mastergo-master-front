import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Alert } from 'react-native';
import Button from '../components/Button';
import RequestServiceInstance from '../services/request.service';
import useRequest from '../hooks/useRequest';
import { Colors } from '../shared/tokens';

export default function NewDetailsScreen({ route }) {
  const { id } = route.params;
  const { request } = useRequest();
  const [formData, setFormData] = useState({
    price: 0,
  });

  const handleChange = (value) => {
    setFormData({ price: value });
  };

  useEffect(() => {
    if (id) {
      RequestServiceInstance.get(id);
    }
  }, [id]);

  const handleAccept = (request) => {
    const { price } = formData;
    if (!price) {
      Alert.alert('Ошибка', 'Все поля должны быть заполнены');
      return;
    }
    Alert.alert('ГОЙДААаАаАаАА');
  };

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

          <View>
            {request.requestType === 'auction' && (
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={formData.price}
                onChangeText={(value) => handleChange(value)}
              />
            )}
            <Button
              text="Принять"
              onPress={() => {
                handleAccept(request);
              }}
            />
          </View>
        </>
      )}
    </View>
  );
}

// {"id":"8ebf0a86-a330-4705-9706-7712b0e71963","internalId":6,"address":"Москва, ул. Пушкина, д.10 сперма","latitude":11,"longitude":11,"masterType":1,"description":"Протечка крана на кухне","photos":["1738578360002_photo_2024-11-14_13-37-11.jpg"],"requestType":"auction","status":"open","createdAt":"2025-02-03T10:26:00.061Z","updatedAt":"2025-02-03T10:26:00.061Z","userId":1}
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
