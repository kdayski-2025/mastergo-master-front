import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import ProfileDefaultIcon from '../../assets/profile-default.png';
import styles from './styled';

import { FontAwesome } from '@expo/vector-icons';

export default function Reviews({ route }) {
  const { data } = route.params;
  const [reviews, setReviews] = useState(data.rewiews);
  const navigation = useNavigation();

  const handlePressUserProfile = (id) => {
    navigation.navigate('OtherUserProfile', { id });
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

  const renderRatingBars = () => {
    return [5, 4, 3, 2, 1].map((rating) => {
      const count = reviews.filter((review) => review.rating === rating).length;
      return (
        <View key={rating} style={styles.ratingBar}>
          <View style={styles.ratingStars}>
            {[...Array(5)].map((_, index) => (
              <FontAwesome
                key={index}
                name={index < rating ? 'star' : 'star-o'}
                size={16}
                color="#FFD700"
                style={{ marginRight: 2 }}
              />
            ))}
          </View>
          <View style={styles.ratingBarContainer}>
            <View
              style={[
                styles.ratingBarFill,
                { width: count > 0 ? '100%' : '0%' },
              ]}
            />
          </View>
          <Text style={styles.ratingCount}>{count}</Text>
        </View>
      );
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.ratingSection}>
        <Text style={styles.ratingNumber}>5.0</Text>
        <Text style={styles.ratingSubtext}>
          на основании {reviews.length} оценки
        </Text>
        <View style={styles.ratingBars}>{renderRatingBars()}</View>
      </View>

      <ScrollView style={styles.reviewsList}>
        {reviews.map((review, index) => (
          <View key={index} style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Image
                source={ProfileDefaultIcon}
                style={styles.reviewerAvatar}
              />
              <View style={styles.reviewerInfo}>
                <Text
                  style={styles.reviewerName}
                  onPress={() => handlePressUserProfile(review.writerUser.id)}
                >
                  {review.writerUser.name}
                </Text>
                <Text style={styles.reviewDate}>
                  {new Date(review.createdAt).toLocaleDateString('ru-RU')} ·
                  Покупатель
                </Text>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <Text style={styles.moreButtonText}>⋮</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.starsContainer}>
              {renderStars(review.rating)}
            </View>
            <Text style={styles.reviewText}>{review.comment}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
