import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../shared/tokens';

export default function Button({ text, ...props }) {
  return (
    <Pressable {...props}>
      <View style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.green,
    padding: 18,
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
  },
});
