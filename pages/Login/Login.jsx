import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import PhoneNumberInput from '../../components/Input/PhoneNumberInput';
import styles from './styled';
import useLogin from '../../hooks/useLogin';
import LoginServiceInstance from '../../services/login.service';
import Button from '../../components/Button/Button';
import UserServiceInstance from '../../services/user.service';

export default function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('+7 (800) 555-35-35');
  const [submitted, setSubmitted] = useState(false);
  const { token, refreshToken } = useLogin();

  useEffect(() => {
    if (token && refreshToken) {
      UserServiceInstance.getProfile();
      navigation.navigate('Main');
    }
    if (submitted) {
      if (!token && !refreshToken) navigation.navigate('Pin');
      setSubmitted(false);
    }
  }, [token, submitted]);

  const handleSubmit = async () => {
    const isValid = phoneNumber.replace(/\D/g, '').length === 11 && phoneNumber.startsWith('+7');
    if (isValid) {
      await LoginServiceInstance.set({ phone: phoneNumber });
      await LoginServiceInstance.auth({ phone: phoneNumber, code: '12345' });
      setSubmitted(true);
    } else {
      Alert.alert(
        'Phone Number',
        'Invalid phone number. Please enter a valid number in the format +7 (XXX) XXX-XX-XX.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles['title-wrap']}>
        <Text style={styles.title}>Введите{'\n'}номер телефона</Text>
        <Text style={styles.subtitle}>Чтобы войти или стать{'\n'}клиентом Mastergo</Text>
      </View>
      <View style={styles.phoneNumber}>
        <PhoneNumberInput placeholder="+7 (XXX) XXX-XX-XX" value={phoneNumber} onChangeText={setPhoneNumber} />
        <Button text="Продолжить" onPress={handleSubmit} />
      </View>
    </View>
  );
}
