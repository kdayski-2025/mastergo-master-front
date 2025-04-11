import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styled';
import ReferralListInstance from '../../services/referralList.service';
import useReferralList from '../../hooks/useReferralList';

import { Ionicons } from '@expo/vector-icons';

export default function ReferalListScreen() {
  const { referralList } = useReferralList();
  const navigation = useNavigation();

  useEffect(() => {
    ReferralListInstance.get();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.wrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Список рефералов:</Text>
        </View>
        {referralList.length > 0 ? (
          referralList.map((referral) => (
            <View key={referral.id} style={styles.referralItem}>
              <Text style={styles.referralName}>{referral.name}</Text>
              <Text style={styles.referralPhone}>{referral.phone}</Text>
              <Text style={styles.referralDate}>
                {new Date(referral.createdAt).toLocaleDateString()}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Рефералов пока нет</Text>
        )}
      </View>
    </View>
  );
}
