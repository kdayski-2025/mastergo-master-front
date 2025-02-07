import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import ProfileDefaultIcon from './Icons/profile-default.png';
import { styles } from './styled';
import CardOrder from '../../components/CardOrder/CardOrder';

import useUser from '../../hooks/useUser';
import useRequests from '../../hooks/useRequests';

import RequestsServiceInstance from '../../services/requests.service';

export default function Profile() {
  const { user } = useUser();
  const { requests, loading } = useRequests();
  const [activeTab, setActiveTab] = useState('new');
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
  useFocusEffect(
    React.useCallback(() => {
      RequestsServiceInstance.get();
      return () => {};
    }, [])
  );
  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.header}>
          <Image
            source={ProfileDefaultIcon}
            style={{ width: 48, height: 48 }}
          />
          <Text style={styles.title}>{user.name}</Text>
          <Text style={styles.title}>+{user.phone}</Text>
        </View>
      )}
      {!loading ? (
        <View>
          <Text style={styles.titleOrders}>Заказы</Text>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'new' && styles.activeTab]}
              onPress={() => setActiveTab('new')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'new' && styles.activeTabText,
                ]}
              >
                Новые
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'active' && styles.activeTab]}
              onPress={() => setActiveTab('active')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'active' && styles.activeTabText,
                ]}
              >
                Активные
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'completed' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('completed')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'completed' && styles.activeTabText,
                ]}
              >
                Выполненные
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.sectionOrderScroll}>
            {activeTab === 'new' && (
              <View style={styles.sectionOrder}>
                {requests.map((request, index) => (
                  <CardOrder
                    key={index}
                    index={index}
                    description={request.description}
                    address={request.address}
                    type={'NewDetails'}
                    id={request.id}
                  />
                ))}
              </View>
            )}
            {activeTab === 'active' && (
              <View style={styles.sectionOrder}>
                {activeRequests.map((request, index) => (
                  <CardOrder
                    key={index}
                    index={index}
                    description={request.description}
                    address={request.address}
                    type={'ActiveDetails'}
                    id={'ed0a3f0b-50cf-4ab7-b737-6b1a01084024'}
                  />
                ))}
              </View>
            )}
            {activeTab === 'completed' && (
              <View style={styles.sectionOrder}>
                {completedRequests.map((request, index) => (
                  <CardOrder
                    key={index}
                    index={index}
                    description={request.description}
                    address={request.address}
                    type={'ActiveDetails'}
                    id={'ed0a3f0b-50cf-4ab7-b737-6b1a01084024'}
                  />
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      ) : (
        <Text style={styles.title}>Loading...</Text>
      )}
    </View>
  );
}
