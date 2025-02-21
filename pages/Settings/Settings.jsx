import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';

import { Colors } from '../../shared/tokens';
import Button from '../../components/Button/Button';
import styles from './styled';
import CitiesServiceInstance from '../../services/cities.service';
import useCities from '../../hooks/useCities';
import { Picker } from '@react-native-picker/picker';
import LoginServiceInstance from '../../services/login.service';
import useUser from '../../hooks/useUser';
import CategoryServiceInstance from '../../services/category.service';
import useCategory from '../../hooks/useCategory';

export default function SettingsScreen() {
  const { cities } = useCities();
  const { categories } = useCategory();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    cityId: '',
    masterTypeId: '',
  });

  useEffect(() => {
    CategoryServiceInstance.get();
    CitiesServiceInstance.get();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { cityId, masterTypeId } = formData;

    if (!cityId || !masterTypeId) {
      Alert.alert('Ошибка', 'Все поля должны быть заполнены');
      return;
    }
    await LoginServiceInstance.set({
      cityId,
      masterTypeId,
    });
    await LoginServiceInstance.edit();
    Alert.alert('Насяльникамана на стройка поменял');
  };

  useEffect(() => {
    setFormData({
      cityId: user?.cityId,
      masterTypeId: user?.masterTypeId,
    });
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Настройки</Text>
        <Text style={styles.subtitle}>Управление вашим аккаунтом</Text>
      </View>

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
          <Picker.Item label="Город" value={null} style={styles.placeholderText} />
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
          <Picker.Item label="Тип работы" value={null} style={styles.placeholderText} />
          {categories.map((type) => (
            <Picker.Item key={type.id} label={type.name} value={type.id} />
          ))}
        </Picker>
      </View>

      <Button text="Сохранить изменения" onPress={handleSubmit} />
    </View>
  );
}
