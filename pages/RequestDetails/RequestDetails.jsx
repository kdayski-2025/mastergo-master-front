import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, ScrollView, Pressable } from 'react-native';
import Button from '../../components/Button/Button';
import RequestServiceInstance from '../../services/request.service';
import useRequest from '../../hooks/useRequest';
import useUser from '../../hooks/useUser';
import styles from './styled';
import Input from '../../components/Input/Input';
import Chat from '../../components/SocketChat/Chat';
import DescriptionRequest from '../../components/DescriptionRequest/DescriptionRequest';
import Feedback from '../../components/Feedback/Feedback';
import UserServiceInstance from '../../services/user.service';
import OtherUserInstance from '../../services/otherUser.service';
import userOtherUser from '../../hooks/userOtherUser';

export default function RequestDetailsScreen({ route }) {
  const { id } = route.params;
  const { userProfile } = useUser();
  const { otherUserProfile } = userOtherUser();
  const { request, offer } = useRequest();
  const [loadingReview, setLoadingReview] = useState(true);
  const [isReviewed, setIsReviewed] = useState(false);
  const [formData, setFormData] = useState({
    price: '',
    comment: '',
  });
  const [btnLoader, setBtnLoader] = useState(false);
  const [btnSendLoader, setBtnSendLoader] = useState(false);
  const handleChange = (value) => {
    setFormData((prev) => ({ ...prev, price: value }));
  };

  const handleCommentChange = (value) => {
    setFormData((prev) => ({ ...prev, comment: value }));
  };

  useEffect(() => {
    const fetchData = () => {
      if (request) {
        if (request?.user?.id) UserServiceInstance.getProfile();
      }
    };

    fetchData();
    // const interval = setInterval(fetchData, 10000);
    // return () => clearInterval(interval);
  }, [request]);

  useEffect(() => {
    if (request) {
      OtherUserInstance.getOtherUserProfile(request.userId);
      if (request.requestType === 'fixed') {
        setFormData((prev) => ({ ...prev, price: request.price }));
      }
    }
  }, [request]);

  useEffect(() => {
    const fetchData = () => {
      if (id) {
        RequestServiceInstance.get(id);
      }
    };

    fetchData();
    // const interval = setInterval(fetchData, 10000);
    // return () => clearInterval(interval);
  }, [id]);

  const handleComplete = async () => {
    setBtnLoader(true);
    await RequestServiceInstance.complete(id);
    await RequestServiceInstance.get(id);
    setBtnLoader(false);
  };

  const handleAccept = () => {
    const { price, comment } = formData;

    if (!price && request.requestType === 'auction') {
      Alert.alert('Ошибка', 'Укажите цену');
      return;
    }
    RequestServiceInstance.postOffer(id, {
      price,
      comment,
      masterId: userProfile.id,
    });
  };

  const handleSendFeedback = async (data) => {
    setBtnSendLoader(true);
    await RequestServiceInstance.sendFeedback(data);
    await RequestServiceInstance.get(id);
    await UserServiceInstance.getProfile();
  };
  useEffect(() => {
    if (userProfile) {
      const reviews = otherUserProfile ? otherUserProfile.rewiews : [];
      const review = reviews.find((item) => {
        return item.requestId === id;
      });
      if (review) {
        setIsReviewed(true);
        setBtnSendLoader(false);
      }
      setLoadingReview(false);
    }
  }, [id, userProfile]);
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      {request && (
        <DescriptionRequest description={request.description} address={request.address} photos={request.photos} />
      )}
      {request && (
        <>
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
              <Button isLoading={btnLoader} text={'Завершить работу'} onPress={handleComplete} mt={11} mb={11} />

              <Chat roomType="request" requestId={id} />
            </View>
          )}
          {!loadingReview && !isReviewed && request.status === 'completed' && (
            <View style={styles.wrapperFeedback}>
              <Text>Вы завершили эту заявку</Text>
              {request.requestType === 'auction' && <Text>Выплата {offer.price} руб.</Text>}
              {request.requestType === 'fixed' && <Text>Выплата {request.price} руб.</Text>}
              <Feedback handleSendFeedback={handleSendFeedback} requestId={id} isLoading={btnSendLoader} />
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
