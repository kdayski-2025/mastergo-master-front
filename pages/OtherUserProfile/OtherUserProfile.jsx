import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ProfileDefaultIcon from '../../assets/profile-default.png';
import styles from './styled';

import userOtherUser from '../../hooks/userOtherUser';

import OtherUserInstance from '../../services/otherUser.service';

import { FontAwesome } from '@expo/vector-icons';
import Container from '../../components/UI/Container/Container';
import Back from '../../components/UI/Back/Back';
import { Colors } from '../../shared/tokens';
import Star from '../../assets/icons/star.svg';
import Message from '../../assets/icons/message.svg';
import EditProfile from '../../assets/icons/edit-profile.svg';

// Import tabs
import InfoTab from './InfoTab';
import ReviewsTab from './ReviewsTab';

export default function OtherUserProfile({ route }) {
  const { id } = route.params;
  const [activeTab, setActiveTab] = useState('info');
  const [isContentReady, setIsContentReady] = useState(false);

  const { otherUserProfile, loading } = userOtherUser();
  const navigation = useNavigation();

  useEffect(() => {
    OtherUserInstance.getOtherUserProfile(id);
  }, [id]);

  useEffect(() => {
    // Когда профиль загружен
    if (otherUserProfile) {
      // Даем небольшую задержку перед показом контента для предотвращения прыжков
      const timer = setTimeout(() => {
        setIsContentReady(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [otherUserProfile]);

  const handlePressReviews = (data) => {
    navigation.navigate('Reviews', { data });
  };

  const renderStars = (rating) => {
    const stars = [];
    const maxStars = 5;

    for (let i = 0; i < maxStars; i++) {
      if (rating >= i + 1) {
        stars.push(<FontAwesome key={i} name="star" size={20} color="#FFD700" style={{ marginRight: 2 }} />);
      } else if (rating > i) {
        stars.push(<FontAwesome key={i} name="star-half-o" size={20} color="#FFD700" style={{ marginRight: 2 }} />);
      } else {
        stars.push(<FontAwesome key={i} name="star-o" size={20} color="#808080" style={{ marginRight: 2 }} />);
      }
    }
    return stars;
  };

  const renderTab = () => {
    if (!otherUserProfile || !isContentReady) return null;

    switch (activeTab) {
      case 'info':
        return <InfoTab userProfile={otherUserProfile} />;
      case 'reviews':
        return <ReviewsTab userProfile={otherUserProfile} />;
      default:
        return <InfoTab userProfile={otherUserProfile} />;
    }
  };

  // Отображаем индикатор загрузки, пока данные не получены
  if (loading) {
    return (
      <View style={styles.wrapper}>
        <Container safe bgColor={Colors.white} pb={0} pt={15} style={styles.container}>
          <Back />
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.orange} />
          </View>
        </Container>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Container safe bgColor={Colors.white} pb={0} pt={15} style={styles.container}>
        <Back />
        {otherUserProfile && (
          <>
            <Text style={styles.master}>{otherUserProfile['masterType.name']}</Text>
            <View style={styles.header}>
              <Image source={ProfileDefaultIcon} style={{ width: 82, height: 82 }} />

              <View style={styles.infoContainer}>
                <Text style={styles.title}>{otherUserProfile.name}</Text>
                <Text style={styles.subtitle}>{otherUserProfile['masterType.name']}</Text>
                <View style={styles.ratingContainer}>
                  <View style={styles.badge}>
                    <Star />
                    <Text style={styles.badgeText}>{otherUserProfile.rating}</Text>
                  </View>
                  <TouchableOpacity style={styles.badge} onPress={() => setActiveTab('reviews')}>
                    <Message />
                    <Text style={styles.badgeText}>{otherUserProfile.rewiews.length}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <EditProfile style={{ marginLeft: 'auto' }} />
            </View>

            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'info' && styles.activeTabButton]}
                onPress={() => setActiveTab('info')}
              >
                <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>Информация</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'reviews' && styles.activeTabButton]}
                onPress={() => setActiveTab('reviews')}
              >
                <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>Отзывы</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Container>

      {/* Контент вкладок - отображается только когда isContentReady = true */}
      <View style={[styles.tabContent, !isContentReady && styles.hidden]}>{renderTab()}</View>
    </View>
  );
}
