import React, { useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import LoginServiceInstance from '../../services/login.service';
import styles from './styled';
import PinCodeInput from '../../components/Input/PinCodeInput';
import useLogin from '../../hooks/useLogin';

export default function PincodeScreen({ navigation }) {
  const { error } = useLogin();
  const onComplete = async (code) => {
    await LoginServiceInstance.auth({ code });
  };

  useEffect(() => {
    if (error === 'Неверный код подтверждения') {
      Alert.alert('Ошибка', 'Неверный код подтверждения');
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введите полученный код</Text>
      <PinCodeInput onComplete={onComplete} />
    </View>
  );
}
