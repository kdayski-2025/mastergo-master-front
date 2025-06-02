import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import ProfileDefaultIcon from '../../assets/profile-default.png';
import styles from './reviewsTabStyled';
import StarEmpty from '../../assets/icons/star-empty.svg';
import Star from '../../assets/icons/star.svg';
import { formatDate } from '../../lib/dateUtils';
import ArrowUp from '../../assets/icons/arrow-up.svg';

const ReviewsTab = ({ userProfile }) => {
  const navigation = useNavigation();
  const reviews = userProfile.rewiews || [];
  const [expandedReviews, setExpandedReviews] = useState([]); // Массив ID развернутых отзывов
  const [textHeights, setTextHeights] = useState({}); // Для хранения высот текстов
  const [initialRender, setInitialRender] = useState(true); // Флаг первого рендера

  // При первой загрузке компонента устанавливаем флаг initialRender в false
  useEffect(() => {
    if (initialRender) {
      // Даем немного времени для измерения текстов перед обновлением флага
      const timer = setTimeout(() => {
        setInitialRender(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [initialRender]);

  const handlePressUserProfile = (id) => {
    // Простая навигация без остановки событий
    navigation.navigate('OtherUserProfile', { id });
  };

  // Функция для переключения состояния раскрытия/сворачивания отзыва
  const toggleReviewExpand = (reviewId) => {
    // Проверяем, превышает ли текст максимальную высоту
    if (textHeights[reviewId] && textHeights[reviewId] > 70) {
      setExpandedReviews((prev) => {
        if (prev.includes(reviewId)) {
          return prev.filter((id) => id !== reviewId);
        } else {
          return [...prev, reviewId];
        }
      });
    }
  };

  // Проверяем, развернут ли отзыв
  const isReviewExpanded = (reviewId) => {
    return expandedReviews.includes(reviewId);
  };

  // Проверяем, может ли отзыв быть развернут (текст слишком длинный)
  const canExpand = (reviewId) => {
    return textHeights[reviewId] && textHeights[reviewId] > 70;
  };

  // Обработчик для измерения высоты текста
  const onTextLayout = (reviewId, event) => {
    const { height } = event.nativeEvent.layout;
    if (!textHeights[reviewId] || textHeights[reviewId] !== height) {
      setTextHeights((prev) => ({
        ...prev,
        [reviewId]: height,
      }));
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const maxStars = 5;

    for (let i = 0; i < maxStars; i++) {
      if (rating >= i + 1) {
        stars.push(<Star key={i} />);
      } else if (rating > i) {
        stars.push(<FontAwesome key={i} name="star-half-o" size={20} color="#FFD700" style={{ marginRight: 2 }} />);
      } else {
        stars.push(<StarEmpty key={i} />);
      }
    }
    return stars;
  };

  const renderReviewItem = (review, index) => {
    const reviewId = review.id || index;
    const isExpanded = isReviewExpanded(reviewId);
    const expandable = canExpand(reviewId);

    return (
      <View key={index} style={[styles.reviewItem, isExpanded && styles.reviewItemExpanded]}>
        <View style={styles.reviewHeader}>
          <Image source={ProfileDefaultIcon} style={styles.reviewerAvatar} />
          <View style={styles.reviewerInfo}>
            {/* Нажатие на имя - всегда переход в профиль */}
            <TouchableOpacity style={{ zIndex: 1000 }} onPress={() => handlePressUserProfile(review.writerUser.id)}>
              <Text style={styles.reviewerName}>{review.writerUser.name}</Text>
            </TouchableOpacity>
            <Text style={styles.reviewDate}>{formatDate(review.createdAt)}</Text>
          </View>
          <View style={styles.starsContainer}>{renderStars(review.rating)}</View>
        </View>

        {/* Невидимый текст для измерения полной высоты - только при первом рендере */}
        {initialRender && (
          <Text
            style={[styles.reviewText, { position: 'absolute', opacity: 0, height: 'auto' }]}
            onLayout={(e) => onTextLayout(reviewId, e)}
          >
            {review.comment}
          </Text>
        )}

        {/* Обертка для текста, которая будет кликабельной для разворачивания */}
        {expandable || initialRender ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => !initialRender && toggleReviewExpand(reviewId)}
            style={[!initialRender ? {} : { maxHeight: 70, overflow: 'hidden' }]}
          >
            <Text
              style={[styles.reviewText, !isExpanded && !initialRender && styles.reviewTextCollapsed]}
              numberOfLines={!isExpanded || initialRender ? 3 : null}
              ellipsizeMode="tail"
            >
              {review.comment}
            </Text>

            {/* Кнопка "Свернуть" для развернутых отзывов */}
            {isExpanded && !initialRender && (
              <TouchableOpacity style={styles.collapseButton} onPress={() => toggleReviewExpand(reviewId)}>
                <Text style={styles.collapseButtonText}>Свернуть</Text>
                <ArrowUp />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ) : (
          <Text style={styles.reviewText}>{review.comment}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.reviewsList}>
        {reviews.length > 0 ? (
          reviews.map(renderReviewItem)
        ) : (
          <View style={styles.noReviews}>
            <Text style={styles.noReviewsText}>У пользователя пока нет отзывов</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ReviewsTab;
