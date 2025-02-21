import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, ScrollView, Pressable } from 'react-native';
import Button from '../../components/Button/Button';
import RequestServiceInstance from '../../services/request.service';
import useRequest from '../../hooks/useRequest';
import useUser from '../../hooks/useUser';
import styles from './styled';
import Input from '../../components/Input/Input';
import Chat from '../../components/Chat/Chat';
import DescriptionRequest from '../../components/DescriptionRequest/DescriptionRequest';

export default function RequestDetailsScreen({ route }) {
  const { id } = route.params;
  const { userProfile } = useUser();
  const { request, offer } = useRequest();
  const [formData, setFormData] = useState({
    price: '',
    comment: '',
  });

  const handleChange = (value) => {
    setFormData({ price: value });
  };

  const handleCommentChange = (value) => {
    setFormData({ comment: value });
  };

  useEffect(() => {
    if (id) {
      RequestServiceInstance.get(id);
    }
  }, [id]);

  const handleComplete = () => {
    RequestServiceInstance.complete(id);
  };

  const handleAccept = () => {
    const { price, comment } = formData;
    if (!price && request.requestType === 'auction') {
      Alert.alert('Ошибка', 'Укажите цену');
      return;
    }
    // user может быть null при приколах с авторизацией. нужно перелогиниться
    RequestServiceInstance.postOffer(id, {
      price,
      comment,
      masterId: userProfile.id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      {request && (
        <>
          <DescriptionRequest description={request.description} address={request.address} photos={request.photos} />
          {!offer && (
            <View style={styles.wrapper}>
              <View style={styles['price-section']}>
                {request.requestType === 'auction' && (
                  <Input
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Ваша цена"
                    value={formData.price}
                    onChangeText={handleChange}
                  />
                )}

                <Input
                  style={styles.input}
                  placeholder="Комментарий"
                  value={formData.comment}
                  onChangeText={handleCommentChange}
                />

                <Button text="Принять" onPress={handleAccept} />
              </View>
            </View>
          )}
          {offer && offer.status === 'pending' && (
            <View style={styles.wrapper}>
              <Text>Ваша заявка на рассмотрении</Text>
            </View>
          )}
          {offer && offer.status === 'rejected' && (
            <View style={styles.wrapper}>
              <Text>Ваша заявка отклонена</Text>
            </View>
          )}
          {offer && request.status === 'in_progress' && (
            <View style={styles.wrapper}>
              <Button text={'Завершить работу'} onPress={handleComplete} />
              <View style={styles.chatWrapper}>
                <Chat requestId={id} />
              </View>
            </View>
          )}
          {offer && request.status === 'completed' && !offer.status === 'rejected' && (
            <View style={styles.wrapper}>
              <Text>Вы завершили эту заявку</Text>
              <Text>Выплата {offer.price} руб.</Text>
              <Text>Написать отзыв (нужен функционал)</Text>
            </View>
          )}
          {offer && request.status === 'completed' && offer.status === 'rejected' && (
            <View style={styles.wrapper}>
              <Text>Ваша заявка отклонена мастером</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}
