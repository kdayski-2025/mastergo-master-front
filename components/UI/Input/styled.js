import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../../shared/tokens';

export const inputStyles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gainsboro,
    borderRadius: 6,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    fontWeight: 300,
  },
  label: {
    fontWeight: 400,
    fontSize: 14,
    color: Colors.gray800,
    marginBottom: 6,
  },
  disableLabel: {
    fontWeight: 300,
    fontSize: 12,
    color: Colors.gray500,
    marginBottom: 6,
  },
  onFile: {
    color: Colors.black,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 41,
  },
  focused: {
    backgroundColor: Colors.gray97,
  },
  hasText: {
    backgroundColor: Colors.gray97,
    borderColor: 'transparent',
    fontWeight: 500,
  },
  disabled: {
    backgroundColor: Colors.gray97,
    borderColor: 'transparent',
    color: Colors.gray500,
  },
  error: {
    borderColor: Colors.error,
    color: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 6,
    fontWeight: 400,
  },
});
