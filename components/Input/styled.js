import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';

export const inputStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
  },
});

export const pinCodeStyles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    width: 20,
    height: 20,
    borderRadius: 45,
    marginHorizontal: 10,
  },
});

export const phoneNumberInputStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    gap: Gaps.g40,
  },
  input: {
    height: 50,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    fontSize: 18,
  },
});

