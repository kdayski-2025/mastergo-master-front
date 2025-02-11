import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 20,
    flex: 1,
    gap: Gaps.g12,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.gray,
    fontSize: 16,
    marginBottom: 24,
  },
});
