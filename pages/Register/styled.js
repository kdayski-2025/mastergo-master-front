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
