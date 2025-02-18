import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import ProfileDefaultIcon from '../../assets/profile-default.png';
import styles from './styled';
import Card from '../../components/Card/Card';

import useUser from '../../hooks/useUser';
import useRequests from '../../hooks/useRequests';

import RequestsServiceInstance from '../../services/requests.service';
import Tabs from '../../components/Tabs/Tabs';
import Tab from '../../components/Tabs/Tab';
import UserServiceInstance from '../../services/user.service';

import { FontAwesome } from '@expo/vector-icons';

export default function Profile() {
  const { userProfile } = useUser();
  const navigation = useNavigation();
  const mmr = 3.5;

  const { requests, loading } = useRequests();
  const tabs = [
    { title: 'Новые', value: 'new' },
    { title: 'Активные', value: 'active' },
    { title: 'Выполненные', value: 'completed' },
  ];
  const activeRequests = [
    {
      id: '8ebf0a86-a330-4705-9706-7712b0e71963',
      internalId: 6,
      address: 'Москва, ул. Пушкина, д.10 сперма',
      latitude: 11,
      longitude: 11,
      masterType: 1,
      description: 'Протечка крана на кухне активно!',
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
  const completedRequests = [
    {
      id: '8ebf0a86-a330-4705-9706-7712b0e71963',
      internalId: 6,
      address: 'Москва, ул. Пушкина, д.10 сперма',
      latitude: 11,
      longitude: 11,
      masterType: 1,
      description: 'Протечка крана на кухне выполнено!',
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

  useEffect(() => {
    UserServiceInstance.getProfile(3);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      RequestsServiceInstance.get();
      return () => {};
    }, [])
  );

  const handlePress = (type, id) => {
    navigation.navigate(type, { id });
  };

  const renderStars = (rating) => {
    const stars = [];
    const maxStars = 5;

    for (let i = 0; i < maxStars; i++) {
      if (rating >= i + 1) {
        stars.push(
          <FontAwesome
            key={i}
            name="star"
            size={20}
            color="#FFD700"
            style={{ marginRight: 2 }}
          />
        );
      } else if (rating > i) {
        stars.push(
          <FontAwesome
            key={i}
            name="star-half-o"
            size={20}
            color="#FFD700"
            style={{ marginRight: 2 }}
          />
        );
      } else {
        stars.push(
          <FontAwesome
            key={i}
            name="star-o"
            size={20}
            color="#808080"
            style={{ marginRight: 2 }}
          />
        );
      }
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      {userProfile && (
        <View style={styles.header}>
          <Image
            source={ProfileDefaultIcon}
            style={{ width: 48, height: 48 }}
          />
          <Text style={styles.title}>{userProfile.name}</Text>
          <Text style={styles.title}>+{userProfile.phone}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.title}>{mmr}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 6,
              }}
            >
              {renderStars(mmr)}
            </View>
          </View>
        </View>
      )}
      {!loading ? (
        <View>
          <Text style={styles.title}>Заказы</Text>
          <Tabs tabs={tabs}>
            <Tab value={'new'}>
              {requests.map((request, index) => (
                <Card
                  key={index}
                  onPress={() => handlePress('NewDetails', request.id)}
                >
                  <Text type={'title'}>{request.masterType.name}</Text>
                  <Text type={'description'}>{request.description}</Text>
                  <Text type={'description'}>{request.address}</Text>
                  <Text type={'price'}>2000р</Text>
                </Card>
              ))}
            </Tab>
            <Tab value={'active'}>
              {activeRequests.map((request, index) => (
                <Card
                  key={index}
                  onPress={() =>
                    handlePress(
                      'ActiveDetails',
                      'ed0a3f0b-50cf-4ab7-b737-6b1a01084024'
                    )
                  }
                >
                  {/* <Text type={'title'}>{request.masterType.name}</Text> */}
                  <Text type={'title'}>{request.description}</Text>
                  <Text type={'description'}>{request.address}</Text>
                  <Text type={'price'}>2000р</Text>
                </Card>
              ))}
            </Tab>
            <Tab value={'completed'}>
              {completedRequests.map((request, index) => (
                <Card
                  key={index}
                  onPress={() =>
                    handlePress(
                      'ActiveDetails',
                      'ed0a3f0b-50cf-4ab7-b737-6b1a01084024'
                    )
                  }
                >
                  {/* <Text type={'title'}>{request.masterType.name}</Text> */}
                  <Text type={'title'}>{request.description}</Text>
                  <Text type={'description'}>{request.address}</Text>
                  <Text type={'price'}>2000р</Text>
                </Card>
              ))}
            </Tab>
          </Tabs>
        </View>
      ) : (
        <Text style={styles.title}>Loading...</Text>
      )}
    </View>
  );
}
