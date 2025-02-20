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
  const [activeTab, setActiveTab] = useState('open');
  const navigation = useNavigation();
  const { requests, loading } = useRequests();
  const tabs = [
    { title: 'Новые', value: 'open' },
    { title: 'Активные', value: 'in_progress' },
    { title: 'Выполненные', value: 'completed' },
  ];

  useEffect(() => {
    UserServiceInstance.getProfile();
  }, []);

  useEffect(() => {
    RequestsServiceInstance.get({ status: activeTab });
  }, [activeTab]);

  const handlePress = (type, id) => {
    navigation.navigate(type, { id });
  };

  const handlePressReviews = (data) => {
    navigation.navigate('Reviews', { data });
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

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
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
            <Text style={styles.title}>{userProfile.rating}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 6,
              }}
            >
              {renderStars(userProfile.rating)}
            </View>
          </View>
          <Text
            style={styles.reviews}
            onPress={() => handlePressReviews(userProfile)}
          >
            {userProfile.rewiews.length} отзывы
          </Text>
        </View>
      )}
      {!loading ? (
        <View>
          <Text style={styles.title}>Заказы</Text>
          <Tabs activeTab={activeTab} tabs={tabs} onTabChange={handleTabChange}>
            <Tab value={'open'} activeTab={activeTab}>
              {requests && requests.length > 0 ? (
                requests.map((request, index) => (
                  <Card
                    key={index}
                    onPress={() => handlePress('RequestDetails', request.id)}
                  >
                    <Text type={'title'}>{request.masterType.name}</Text>
                    <Text type={'description'}>{request.description}</Text>
                    <Text type={'description'}>{request.address}</Text>
                    <Text type={'price'}>2000р</Text>
                  </Card>
                ))
              ) : (
                <Text type={'title'}>Заказов нет!</Text>
              )}
            </Tab>

            <Tab value={'in_progress'} activeTab={activeTab}>
              {requests && requests.length > 0 ? (
                requests.map((request, index) => (
                  <Card
                    key={index}
                    onPress={() => handlePress('RequestDetails', request.id)}
                  >
                    <Text type={'title'}>{request.masterType.name}</Text>
                    <Text type={'description'}>{request.description}</Text>
                    <Text type={'description'}>{request.address}</Text>
                    <Text type={'price'}>2000р</Text>
                  </Card>
                ))
              ) : (
                <Text type={'title'}>Заказов нет!</Text>
              )}
            </Tab>

            <Tab value={'completed'} activeTab={activeTab}>
              {requests && requests.length > 0 ? (
                requests.map((request, index) => (
                  <Card
                    key={index}
                    onPress={() => handlePress('RequestDetails', request.id)}
                  >
                    <Text type={'title'}>{request.masterType.name}</Text>
                    <Text type={'description'}>{request.description}</Text>
                    <Text type={'description'}>{request.address}</Text>
                    <Text type={'price'}>2000р</Text>
                  </Card>
                ))
              ) : (
                <Text type={'title'}>Заказов нет!</Text>
              )}
            </Tab>
          </Tabs>
        </View>
      ) : (
        <Text style={styles.title}>Loading...</Text>
      )}
    </View>
  );
}
