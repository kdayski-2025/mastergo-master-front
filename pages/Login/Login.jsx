import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import PhoneNumberInput from '../../components/Input/PhoneNumberInput';
import useUser from '../../hooks/useUser';
import styles from './styled';

export default function LoginScreen({ navigation }) {
  const [submitted, setSubmitted] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (submitted) {
      if (!user) navigation.navigate('Pin');
      else navigation.navigate('Main');
      setSubmitted(false);
    }
  }, [user, submitted]);

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
