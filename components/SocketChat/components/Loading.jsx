import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Colors } from '../../../shared/tokens';
import Container from '../../UI/Container/Container';
import styles from '../styled';

export default function Loading() {
  return (
    <Container safe bgColor={Colors.white} pb={25}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.orange} />
        <Text style={styles.loadingText}>Загрузка чата...</Text>
      </View>
    </Container>
  );
}
