import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './infoTabStyled';

const InfoTab = ({ userProfile }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>О себе:</Text>
        <Text style={styles.sectionText}>{userProfile['masterType.description'] || 'Информация отсутствует'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Опыт работы:</Text>
        <Text style={styles.sectionText}>{userProfile.experience || 'Информация отсутствует'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Услуги:</Text>
        {userProfile.services && userProfile.services.length > 0 ? (
          userProfile.services.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>{service.price} ₽</Text>
            </View>
          ))
        ) : (
          <Text style={styles.sectionText}>Услуги не указаны</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Контактная информация:</Text>
        <Text style={styles.contactItem}>Телефон: {userProfile.phone || 'Не указан'}</Text>
        <Text style={styles.contactItem}>Email: {userProfile.email || 'Не указан'}</Text>
      </View>
    </ScrollView>
  );
};

export default InfoTab;
