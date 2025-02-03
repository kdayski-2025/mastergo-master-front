import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Alert } from 'react-native';
import { Colors, Gaps } from '../shared/tokens';
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
      <TextInput
        style={styles.input}
        placeholder="Город"
        value={formData.city}
        onChangeText={(value) => handleInputChange('city', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Специальность"
        value={formData.specialty}
        onChangeText={(value) => handleInputChange('specialty', value)}
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
