import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 48,
    flex: 1,
    gap: Gaps.g40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
