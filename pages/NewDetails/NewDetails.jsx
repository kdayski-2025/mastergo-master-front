import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  ScrollView,
  Pressable,
} from 'react-native';
import Button from '../../components/Button/Button';
import RequestServiceInstance from '../../services/request.service';
import useRequest from '../../hooks/useRequest';
import { getAssetUrl } from '../../lib/lib';
import OfferServiceInstance from '../../services/offer.service';
import useUser from '../../hooks/useUser';
import { styles } from './styled';

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
    await OfferServiceInstance.post(id, {
      price,
      comment: 'Сделаю быстро и качественно',
      masterId: user.id,
    });
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
                    <Pressable
                      key={index}
                      onPress={() => console.log('Open photo')}
                    >
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
