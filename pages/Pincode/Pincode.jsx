import React from 'react';
import { Text, View } from 'react-native';
import LoginServiceInstance from '../../services/login.service';
import styles from './styled';
import PinCodeInput from '../../components/Input/PinCodeInput';

export default function PincodeScreen({ navigation }) {
  const onComplete = async (code) => {
    await LoginServiceInstance.set({ code });
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Придумайте код{'\n'}для входа в приложение</Text>
      <PinCodeInput onComplete={onComplete} />
    </View>
  );
}
