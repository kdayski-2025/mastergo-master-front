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
import UserServiceInstance from '../../services/user.service';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input/Input';

import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { cities } = useCities();
  const { categories } = useCategory();
  const { userProfile } = useUser();
  const [formData, setFormData] = useState({
    cityId: '',
    masterTypeId: '',
    referralCode: '',
  });

  const navigation = useNavigation();

  useEffect(() => {
    CategoryServiceInstance.get();
    CitiesServiceInstance.get();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleNavigate = () => {
    navigation.navigate('ReferralList');
  };

  const handleSubmit = async () => {
    const { cityId, masterTypeId, referralCode } = formData;

    if (!cityId || !masterTypeId || !referralCode) {
      Alert.alert('Ошибка', 'Все поля должны быть заполнены');
      return;
    }
    await LoginServiceInstance.set({
      cityId,
      masterTypeId,
      referralCode,
    });

    await LoginServiceInstance.edit();
    await UserServiceInstance.getProfile();

    Alert.alert('Настройки сохранены');
  };

  useEffect(() => {
    setFormData({
      cityId: userProfile?.cityId,
      masterTypeId: userProfile?.masterTypeId,
      referralCode: userProfile?.referralCode,
    });
  }, [userProfile]);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Настройки</Text>
        <Text style={styles.subtitle}>Управление вашим аккаунтом</Text>
      </View>

      <View>
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

      <View>
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
            label="Тип работы"
            value={null}
            style={styles.placeholderText}
          />
          {categories.map((type) => (
            <Picker.Item key={type.id} label={type.name} value={type.id} />
          ))}
        </Picker>
      </View>

      <View>
        <Text style={styles.text}>Промокод</Text>
        <Input
          placeholder="Промокод"
          value={formData.referralCode}
          onChangeText={(value) => handleInputChange('referralCode', value)}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.emptyText} onPress={() => handleNavigate()}>
            Список рефералов
          </Text>
          <Ionicons
            name="arrow-forward"
            size={16}
            color="#666"
            style={{ marginTop: '4', marginLeft: '4' }}
          />
        </View>
      </View>

      <Button text="Сохранить изменения" onPress={handleSubmit} />
    </View>
  );
}
