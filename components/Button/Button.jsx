import { TouchableOpacity, Text, View } from 'react-native';
import styles from './styled';

export default function Button({ text, styleBtn, styleText, ...props }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity {...props}>
        <View style={[styles.button, styleBtn]}>
          <Text style={[styles.text, styleText]}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
