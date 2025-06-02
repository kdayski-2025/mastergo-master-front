import { StyleSheet } from 'react-native';
import { Colors } from '../../shared/tokens';

export default styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.orange,
    padding: 12,
    borderRadius: 8,
  },
  container: {
    // shadowColor: Colors.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  text: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
