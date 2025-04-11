import React, { useEffect, useState } from 'react';
import { Text, View, Alert } from 'react-native';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import LoginServiceInstance from '../../services/login.service';
import UserServiceInstance from '../../services/user.service';
import useLogin from '../../hooks/useLogin';
import useUser from '../../hooks/useUser';
import styles from './styled';
import CitiesServiceInstance from '../../services/cities.service';
import useCities from '../../hooks/useCities';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../../shared/tokens';
import useCategory from '../../hooks/useCategory';
import CategoryServiceInstance from '../../services/category.service';

export default function RegisterScreen({ navigation }) {
  const [submitted, setSubmitted] = useState(false);
  const { userProfile } = useUser();
  const { loginInfo, token, error, setError } = useLogin();
  const { cities } = useCities();
  const { categories } = useCategory();

  const [formData, setFormData] = useState({
    fullName: 'Magomed Magomedov',
    birthDate: '01.01.2000',
    citizenship: 'Chechnya',
    email: 'borba@mail.ru',
    cityId: '',
    referralCode: '',
    masterTypeId: '',
  });

  useEffect(() => {
    if (token && loginInfo.name !== null) {
      navigation.navigate('Main');
    } else {
      setError(null);
    }
  }, [token]);

  useEffect(() => {
    UserServiceInstance.getProfile();
  }, [submitted, loginInfo]);

  useEffect(() => {
    CitiesServiceInstance.get();
    CategoryServiceInstance.get();
  }, []);

  useEffect(() => {
    if (error === 'Несуществующий промокод')
      Alert.alert('Ошибка', 'Несуществующий промокод');
  }, [error]);

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
    const {
      fullName,
      birthDate,
      citizenship,
      email,
      cityId,
      referralCode,
      masterTypeId,
    } = formData;

    // Проверка на заполненность полей
    const emptyFields = [];
    if (!fullName) emptyFields.push('ФИО');
    if (!birthDate) emptyFields.push('Дата рождения');
    if (!citizenship) emptyFields.push('Гражданство');
    if (!email) emptyFields.push('E-mail');
    if (!cityId) emptyFields.push('Город');
    if (!masterTypeId) emptyFields.push('Профессия');

    if (emptyFields.length > 0) {
      Alert.alert(
        'Ошибка',
        `Не заполнены обязательные поля:\n\n${emptyFields.join('\n')}`
      );
      return;
    }

    if (!validateFullName(fullName)) {
      Alert.alert('Ошибка', 'ФИО должно содержать минимум Фамилию и Имя');
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

    await LoginServiceInstance.set({
      name: fullName,
      birth: birthDate,
      citizenship,
      email,
      cityId,
      referralCode,
      masterTypeId,
    });
    await LoginServiceInstance.register();
    setSubmitted(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Стать мастером IZZI</Text>
      <Text style={styles.subtitle}>
        Укажите ваши данные, чтобы использовать все функции приложения
      </Text>

      <Input
        placeholder="Фамилия, имя, отчество"
        value={formData.fullName}
        onChangeText={(value) => handleInputChange('fullName', value)}
      />

      <Input
        placeholder="Дата рождения (ДД.ММ.ГГГГ)"
        value={formData.birthDate}
        onChangeText={(value) => handleInputChange('birthDate', value)}
        keyboardType="numeric"
      />

      <Input
        placeholder="Гражданство"
        value={formData.citizenship}
        onChangeText={(value) => handleInputChange('citizenship', value)}
      />

      <Input
        placeholder="E-mail"
        value={formData.email}
        onChangeText={(value) => handleInputChange('email', value)}
        keyboardType="email-address"
      />

      <View style={{ ...styles.input, paddingHorizontal: 0 }}>
        <Picker
          selectedValue={formData.cityId}
          onValueChange={(value) => handleInputChange('cityId', value)}
          style={{
            ...styles.pickerPlaceholder,
            color: formData.cityId ? Colors.black : Colors.gray,
          }}
          dropdownIconColor={Colors.gray}
          mode="dialog"
        >
          <Picker.Item
            label="Город"
            value={null}
            style={styles.placeholderText}
          />
          {cities.map((type) => (
            <Picker.Item key={type.id} label={type.name} value={type.id} />
          ))}
        </Picker>
      </View>

      <View style={{ ...styles.input, paddingHorizontal: 0 }}>
        <Picker
          selectedValue={formData.masterTypeId}
          onValueChange={(value) => handleInputChange('masterTypeId', value)}
          style={{
            ...styles.pickerPlaceholder,
            color: formData.masterTypeId ? Colors.black : Colors.gray,
          }}
          dropdownIconColor={Colors.gray}
          mode="dialog"
        >
          <Picker.Item
            label="Ваши услуги"
            value={null}
            style={styles.placeholderText}
          />
          {categories.map((type) => (
            <Picker.Item key={type.id} label={type.name} value={type.id} />
          ))}
        </Picker>
      </View>

      <Input
        placeholder="Реферальный код (необязательно)"
        value={formData.referralCode}
        onChangeText={(value) => handleInputChange('referralCode', value)}
      />

      <Button text="Продолжить" onPress={handleSubmit} />
    </View>
  );
}
