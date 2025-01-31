import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PhoneNumberInput from '../components/PhoneNumberInput';
import { Colors, Gaps } from '../shared/tokens';
import useUser from '../hooks/useUser';

export default function LoginScreen({ navigation }) {
  const [submitted, setSubmitted] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (submitted) {
      if (!user) navigation.navigate('Pin');
      else navigation.navigate('Home');
      setSubmitted(false);
    }
  }, [user, submitted]);

  return (
    <View style={styles.container}>
      <View style={styles.title_wrap}>
        <Text style={styles.title}>Введите{'\n'}номер телефона</Text>
        <Text style={styles.subtitle}>Чтобы войти или стать{'\n'}клиентом Sperma</Text>
      </View>
      <PhoneNumberInput setSubmitted={setSubmitted} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 48,
    flex: 1,
    gap: Gaps.g40,
  },
  title_wrap: {
    gap: Gaps.g12,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.gray,
    fontSize: 16,
  },
  link: {
    color: Colors.blue,
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
