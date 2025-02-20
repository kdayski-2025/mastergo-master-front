import { StyleSheet } from 'react-native';
import { Colors, Radius } from '../../shared/tokens';

export default StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: Radius.medium,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
});