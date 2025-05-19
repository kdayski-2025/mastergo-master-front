import React from 'react';
import { View, Text, Image } from 'react-native';
import { Colors } from '../../../shared/tokens';
import Container from '../../UI/Container/Container';
import styles from '../styled';
import * as handle from '../handle';
import HandIcon from '../../../assets/icons/hand.svg';
import DiamondIcon from '../../../assets/dimand.png';
import CleverIcon from '../../../assets/clever.png';
import Button from '../../Button/Button';

export default function OutOfTokens({ roomType }) {
  return (
    <Container safe bgColor={Colors.white} pb={0}>
      <View style={{ flex: 1 }}>
        <View style={styles.outOfBalance.header}>
          <Text style={styles.outOfBalance.headerTitle}>Привет</Text>
          <HandIcon width={40} height={40} />
        </View>

        <Text style={styles.outOfBalance.subtitle}>У вас закончились токены</Text>

        <Text style={styles.outOfBalance.description}>
          Пожалуйста, пополните баланс, чтобы продолжить использовать возможности AI
        </Text>

        <View style={styles.outOfBalance.balanceContainer}>
          <View style={styles.outOfBalance.icons}>
            <Image style={styles.outOfBalance.icon1} source={CleverIcon} />
            <Image style={styles.outOfBalance.icon2} source={DiamondIcon} />
          </View>
          <View style={styles.outOfBalance.balanceCard}>
            <Text style={styles.outOfBalance.balanceCardTitle}>Ваш текущий баланс:</Text>
            <Text style={styles.outOfBalance.balanceCardValue}>$0</Text>
          </View>
        </View>
      </View>

      <Button style={styles.outOfBalance.button} text="Пополнить баланс" onPress={() => handle.handleAddBalance()} />
    </Container>
  );
}
