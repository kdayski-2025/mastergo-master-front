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
  'title-wrap': {
    gap: Gaps.g12,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.gray,
    fontSize: 16,
  },
  link: {
    color: Colors.blue,
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
