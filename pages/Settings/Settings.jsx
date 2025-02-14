import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { Colors } from '../../shared/tokens';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './styled';

export default function SettingsScreen() {
  const [formData, setFormData] = useState({
    city: '',
    specialty: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { city, specialty } = formData;

    if (!city || !specialty) {
      Alert.alert('Ошибка', 'Все поля должны быть заполнены');
      return;
    }

    Alert.alert('Гойцвужйдцулдаудцкл');
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Настройки</Text>
        <Text style={styles.subtitle}>Управление вашим аккаунтом</Text>
      </View>

      <Input
        placeholder="Город"
        placeholderTextColor={Colors.gray}
        value={formData.city}
        onChangeText={(value) => handleInputChange('city', value)}
      />

      <Input
        placeholder="Специальность"
        placeholderTextColor={Colors.gray}
        value={formData.specialty}
        onChangeText={(value) => handleInputChange('specialty', value)}
      />

      <Button text="Сохранить изменения" onPress={handleSubmit} />
    </View>
  );
}
