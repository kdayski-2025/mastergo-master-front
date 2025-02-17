import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';

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
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 4,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    height: 50,
    marginBottom: 15,
    width: '100%',
    textAlign: 'left',
    position: 'relative',
  },
  pickerPlaceholder: {
    opacity: 1,
  },
  placeholderText: {
    color: Colors.gray,
    textAlign: 'left',
  },
});
