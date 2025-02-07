import { Pressable, Text, View } from 'react-native';
import { styles } from './styled';

export default function Button({ text, ...props }) {
  return (
    <Pressable {...props}>
      <View style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
}
