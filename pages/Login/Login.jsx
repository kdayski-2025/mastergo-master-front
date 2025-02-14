import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import PhoneNumberInput from '../../components/Input/PhoneNumberInput';
import styles from './styled';
import useLogin from '../../hooks/useLogin';

export default function LoginScreen({ navigation }) {
  const [submitted, setSubmitted] = useState(false);
  const { token } = useLogin();

  useEffect(() => {
    if (token) {
      navigation.navigate('Requests');
    }
    if (submitted) {
      if (!token) navigation.navigate('Pin');
      setSubmitted(false);
    }
  }, [token, submitted]);

  return (
    <View style={styles.container}>
      <View style={styles['title-wrap']}>
        <Text style={styles.title}>Введите{'\n'}номер телефона</Text>
        <Text style={styles.subtitle}>Чтобы войти или стать{'\n'}клиентом Mastergo</Text>
      </View>
      <PhoneNumberInput setSubmitted={setSubmitted} />
    </View>
  );
}
