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
    paddingTop: 0,
  },
});
