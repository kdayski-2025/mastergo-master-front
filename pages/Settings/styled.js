import { StyleSheet } from 'react-native';
import { Colors, Gaps, Radius, Shadows } from '../../shared/tokens';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.gray50,
    flex: 1,
    padding: Gaps.g16,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: Gaps.g8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray600,
    marginBottom: Gaps.g24,
  },
  section: {
    marginTop: Gaps.g40,
    marginBottom: Gaps.g24,
  },
});
