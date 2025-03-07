import { TouchableOpacity, Text, View } from 'react-native';
import styles from './styled';
import Loader from '../Loader/Loader';

export default function Button({
  text,
  isLoading,
  styleBtn,
  styleText,
  heightLoader,
  mt,
  mb,
  ...props
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={isLoading} {...props}>
        <View style={[styles.button, styleBtn]}>
          {isLoading ? (
            <Loader color="white" height={heightLoader} mt={mt} mb={mb} />
          ) : (
            <Text style={[styles.text, styleText]}>{text}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
