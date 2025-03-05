import { TouchableOpacity, Text, View } from 'react-native';
import styles from './styled';
import Loader from '../Loader/Loader';

export default function Button({
  text,
  isLoading,
  styleBtn,
  styleText,
  ...props
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity {...props}>
        <View style={[styles.button, styleBtn]}>
          {isLoading ? (
            <Loader color="white" mb={11} mt={11} />
          ) : (
            <Text style={[styles.text, styleText]}>{text}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
