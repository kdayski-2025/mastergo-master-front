import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Colors } from '../../../shared/tokens';
import Container from '../../UI/Container/Container';
import Back from '../../UI/Back/Back';
import styles from '../styled';
import Actions from './Actions';
import NeuralIcon from '../../../assets/neural.png';

export default function EmptyChat({ roomType }) {
  return (
    <Container safe bgColor={Colors.white} pb={0} pt={15}>
      {roomType === 'ai' && <Back />}
      {roomType === 'ai' && (
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Помощь AI</Text>
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View style={styles.contentContainer}>
          {roomType === 'ai' && (
            <View style={styles.content}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Привет!</Text>
                <Text style={styles.cardDescription}>Что у вас случилось?</Text>
              </View>
              <Image source={NeuralIcon} style={styles.neuralImg} />
            </View>
          )}
          <Actions roomType={roomType} />
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}
