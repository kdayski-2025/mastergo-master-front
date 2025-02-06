import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Alert, ScrollView, Pressable } from 'react-native';
import Button from '../components/Button';
import RequestServiceInstance from '../services/request.service';
import useRequest from '../hooks/useRequest';
import { Colors, Gaps, Radius, Shadows } from '../shared/tokens';
import { getAssetUrl } from '../lib/lib';
import OfferServiceInstance from '../services/offer.service';
import useUser from '../hooks/useUser';

export default function NewDetailsScreen({ route }) {
  const { id } = route.params;
  const { user } = useUser();
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

  const handleAccept = async () => {
    const { price } = formData;
    if (!price) {
      Alert.alert('Ошибка', 'Укажите цену');
      return;
    }
    await OfferServiceInstance.post(id, { price, comment: 'Сделаю быстро и качественно', masterId: user.id });
    Alert.alert('Ваш ответ отправлен');
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
                        source={{ uri: `${getAssetUrl()}/${photo}` }}
                        style={styles.thumbnail}
                        resizeMode="cover"
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
                <Button text="Принять" onPress={handleAccept} />
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray50,
  },
  header: {
    height: 60,
    backgroundColor: 'transparent',
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
