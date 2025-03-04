import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ProfileDefaultIcon from '../../assets/profile-default.png';
import styles from './styled';

import userOtherUser from '../../hooks/userOtherUser';

import OtherUserInstance from '../../services/otherUser.service';

import { FontAwesome } from '@expo/vector-icons';

export default function OtherUserProfile({ route }) {
  const { id } = route.params;

  const { otherUserProfile } = userOtherUser();
  const navigation = useNavigation();

  useEffect(() => {
    OtherUserInstance.getOtherUserProfile(id);
  }, [id]);

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

  return (
    <View style={styles.container}>
      {otherUserProfile && (
        <View style={styles.header}>
          <View style={styles.wrapperImage}>
            <Image
              source={ProfileDefaultIcon}
              style={{ width: 48, height: 48 }}
            />
          </View>

          <Text style={styles.title}>{otherUserProfile.name}</Text>
          <Text style={styles.title}>+{otherUserProfile.phone}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.title}>{otherUserProfile.rating}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 6,
              }}
            >
              {renderStars(otherUserProfile.rating)}
            </View>
          </View>
          <Text
            style={styles.reviews}
            onPress={() => handlePressReviews(otherUserProfile)}
          >
            {otherUserProfile.rewiews.length} отзывы
          </Text>
        </View>
      )}
    </View>
  );
}
