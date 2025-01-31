import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { Colors, Gaps } from '../shared/tokens';
import Button from '../components/Button';
import LoginServiceInstance from '../services/login.service';
import UserServiceInstance from '../services/user.service';
import useLogin from '../hooks/useLogin';
import useUser from '../hooks/useUser';

export default function RegisterScreen({ navigation }) {
  const [submitted, setSubmitted] = useState(false);
  const { user } = useUser();
  const { loginInfo } = useLogin();
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    citizenship: '',
    email: '',
  });

  useEffect(() => {
    if (submitted) UserServiceInstance.get(loginInfo);
  }, [submitted, loginInfo]);

  useEffect(() => {
    if (user) navigation.navigate('Home');
  }, [user]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateFullName = (fullName) => {
    return fullName.trim().split(/\s+/).length >= 2;
  };

  const validateBirthDate = (birthDate) => {
    const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
    return dateRegex.test(birthDate);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    const { fullName, birthDate, citizenship, email } = formData;

    if (!fullName || !birthDate || !citizenship || !email) {
      Alert.alert('Ошибка', 'Все поля должны быть заполнены');
      return;
    }

    if (!validateFullName(fullName)) {
      Alert.alert('Ошибка', 'ФИО должно содержать минимум Фимилию, Имя');
      return;
    }

    if (!validateBirthDate(birthDate)) {
      Alert.alert('Ошибка', 'Дата рождения должна быть в формате "ДД.ММ.ГГГГ"');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Ошибка', 'Введите корректный E-mail');
      return;
    }

    await LoginServiceInstance.set({ name: fullName, birth: birthDate, citizenship, email });
    await LoginServiceInstance.register();
    setSubmitted(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Стать клиентом Sperma</Text>
      <Text style={styles.subtitle}>Укажите ваши данные, чтобы использовать все функции приложения</Text>

      <TextInput
        style={styles.input}
        placeholder="Фамилия, имя, отчество"
        value={formData.fullName}
        onChangeText={(value) => handleInputChange('fullName', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Дата рождения (ДД.ММ.ГГГГ)"
        value={formData.birthDate}
        onChangeText={(value) => handleInputChange('birthDate', value)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Гражданство"
        value={formData.citizenship}
        onChangeText={(value) => handleInputChange('citizenship', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={formData.email}
        onChangeText={(value) => handleInputChange('email', value)}
        keyboardType="email-address"
      />

      <Button text="Продолжить" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 20,
    flex: 1,
    gap: Gaps.g12,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.gray,
    fontSize: 16,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
  },
});
