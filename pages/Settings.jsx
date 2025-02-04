import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Colors, Gaps, Radius, Shadows } from '../shared/tokens';
import Button from '../components/Button';

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

      <TextInput
        style={styles.input}
        placeholder="Город"
        placeholderTextColor={Colors.gray}
        value={formData.city}
        onChangeText={(value) => handleInputChange('city', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Специальность"
        placeholderTextColor={Colors.gray}
        value={formData.specialty}
        onChangeText={(value) => handleInputChange('specialty', value)}
      />

      <View style={styles.buttonContainer}>
        <Button text="Сохранить изменения" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray50,
    flex: 1,
    padding: Gaps.g16,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: Gaps.g8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray600,
    marginBottom: Gaps.g24,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: Radius.small,
    padding: Gaps.g12,
    fontSize: 16,
    color: Colors.black,
    backgroundColor: Colors.gray50,
    marginBottom: Gaps.g16,
  },
  buttonContainer: {
    marginTop: Gaps.g24,
    backgroundColor: Colors.white,
    borderRadius: Radius.medium,
    padding: Gaps.g16,
    ...Shadows.small,
  },
  section: {
    marginTop: Gaps.g40,
    marginBottom: Gaps.g24,

  },
});
