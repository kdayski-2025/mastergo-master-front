import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    height: 40,
    backgroundColor: 'transparent',
  },
  content: {
    flexGrow: 1,
    padding: Gaps.g12,
  },
  'content-empty': {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  message: {
    color: Colors.gray,
    fontSize: 16,
  },
});
