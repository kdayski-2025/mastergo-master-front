import { StyleSheet } from 'react-native';
import { Colors, Gaps, Radius, Shadows } from '../../shared/tokens';

export const styles = StyleSheet.create({
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
  input: {
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: Radius.small,
    padding: Gaps.g12,
    fontSize: 16,
    color: Colors.black,
    backgroundColor: Colors.gray50,
    marginBottom: Gaps.g16,
  },
  buttonContainer: {
    marginTop: Gaps.g24,
    backgroundColor: Colors.white,
    borderRadius: Radius.medium,
    padding: Gaps.g16,
    ...Shadows.small,
  },
  section: {
    marginTop: Gaps.g40,
    marginBottom: Gaps.g24,
  },
});
