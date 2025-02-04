import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Alert, ScrollView, Pressable } from 'react-native';
import Button from '../components/Button';
import RequestServiceInstance from '../services/request.service';
import useRequest from '../hooks/useRequest';
import { Colors, Gaps, Radius, Shadows } from '../shared/tokens';

export default function NewDetailsScreen({ route }) {
  const { id } = route.params;
  const { request } = useRequest();
  const [formData, setFormData] = useState({
    price: '',
  });

  const handleChange = (value) => {
    setFormData({ price: value });
  };

  useEffect(() => {
    if (id) {
      RequestServiceInstance.get(id);
    }
  }, [id]);

  const handleAccept = () => {
    const { price } = formData;
    if (!price) {
      Alert.alert('Ошибка', 'Укажите цену');
      return;
    }
    Alert.alert('ГОЙДААаАаАаАА');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <ScrollView contentContainerStyle={styles.content}>
        {request && (
          <>
            <View style={styles.section}>
              <Text style={styles.title}>Описание заказа</Text>
              <Text style={styles.description}>{request.description}</Text>
              <Text style={styles.address}>{request.address}</Text>
            </View>

            {request.photos?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.title}>Фотографии</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {request.photos.map((photo, index) => (
                    <Pressable key={index} onPress={() => console.log('Open photo')}>
                      <Image 
                        source={{ uri: photo }} 
                        style={styles.thumbnail}
                      />
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}

            <View style={styles.priceSection}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Ваша цена"
                value={formData.price}
                onChangeText={handleChange}
              />
              <View style={styles.buttonWrapper}>
                <Button
                  text="Принять"
                  onPress={handleAccept}
                />
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

// {"id":"8ebf0a86-a330-4705-9706-7712b0e71963","internalId":6,"address":"Москва, ул. Пушкина, д.10 сперма","latitude":11,"longitude":11,"masterType":1,"description":"Протечка крана на кухне","photos":["1738578360002_photo_2024-11-14_13-37-11.jpg"],"requestType":"auction","status":"open","createdAt":"2025-02-03T10:26:00.061Z","updatedAt":"2025-02-03T10:26:00.061Z","userId":1}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray50,
  },
  header: {
    height: 60,
    backgroundColor: "transparent",
    justifyContent: 'center',
    paddingHorizontal: Gaps.g16,
  },
  content: {
    flexGrow: 1,
    padding: Gaps.g16,
  },
  section: {
    marginBottom: Gaps.g24,
    backgroundColor: Colors.white,
    borderRadius: Radius.medium,
    padding: Gaps.g16,
    ...Shadows.small,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: Gaps.g12,
    color: Colors.black,
  },
  description: {
    fontSize: 16,
    color: Colors.gray700,
    marginBottom: Gaps.g12,
    lineHeight: 24,
  },
  address: {
    fontSize: 14,
    color: Colors.gray600,
    fontStyle: 'italic',
  },
  thumbnail: {
    width: 120,
    height: 120,
    borderRadius: Radius.small,
    marginRight: Gaps.g12,
    backgroundColor: Colors.gray100,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Gaps.g24,
    backgroundColor: Colors.white,
    borderRadius: Radius.medium,
    padding: Gaps.g16,
    ...Shadows.small,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: Radius.small,
    padding: Gaps.g12,
    marginRight: Gaps.g12,
    fontSize: 16,
    backgroundColor: Colors.gray50,
  },
  buttonWrapper: {
    width: 140,
    padding: Gaps.g12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
