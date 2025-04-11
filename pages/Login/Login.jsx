import React, { useEffect, useState } from 'react';
import { Text, View, Linking } from 'react-native';
import PhoneNumberInput from '../../components/Input/PhoneNumberInput';
import styles from './styled';
import useLogin from '../../hooks/useLogin';
import LoginServiceInstance from '../../services/login.service';
import Button from '../../components/Button/Button';

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
    <View style={styles.container}>
      <View style={styles['title-wrap']}>
        <Text style={styles.title}>Воспользуйтесь телеграмм ботом</Text>
        <Text style={styles.subtitle}>
          Для работы приложения нам необходим Ваш актуальный номер телефона.
        </Text>
      </View>
      <View style={styles.phoneNumber}>
        <Button text="Открыть бота" onPress={handleSubmit} />
      </View>
    </View>
  );
}
