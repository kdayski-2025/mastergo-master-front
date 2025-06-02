import React, { useEffect, useState } from 'react';
import { Text, View, Linking, ImageBackground, Image, StatusBar } from 'react-native';
import PhoneNumberInput from '../../components/Input/PhoneNumberInput';
import styles from './styled';
import useLogin from '../../hooks/useLogin';
import LoginServiceInstance from '../../services/login.service';
import Button from '../../components/Button/Button';
import Container from '../../components/UI/Container/Container';
import backgroundImage from '../../assets/main-bg.jpg';

export default function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('+7 (777) 777-77-77');
  const [submitted, setSubmitted] = useState(false);
  const { loginInfo, token, refreshToken } = useLogin();
  useEffect(() => {
    if (token && refreshToken && loginInfo?.name !== null) {
      navigation.navigate('Main');
    }

    if (token && refreshToken && loginInfo?.name === null) {
      navigation.navigate('Register');
    }
    if (submitted) {
      if (!token && !refreshToken) navigation.navigate('Pin');
      setSubmitted(false);
    }
  }, [token, submitted]);

  const handleSubmit = () => {
    Linking.openURL('https://t.me/MasterGoVerBot');
    navigation.navigate('Pin');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <StatusBar translucent backgroundColor="transparent" />
      <Container pb={25}>
        <View style={styles.login}>
          <Text style={styles.title}>Воспользуйтесь телеграмм ботом</Text>
          <Text style={styles.subtitle}>Для работы приложения нам необходим Ваш актуальный номер телефона</Text>
          <Button text="Открыть бота" onPress={handleSubmit} />
        </View>
      </Container>
    </ImageBackground>
  );
}
