import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';

export default StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: Gaps.g40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
});
