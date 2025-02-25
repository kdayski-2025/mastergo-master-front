import { StyleSheet } from 'react-native';
import { Colors } from '../../shared/tokens';

export const input = StyleSheet.create({
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
    paddingHorizontal: 0,
  },
  placeholder: {
    opacity: 1,
  },
  'placeholder-text': {
    color: Colors.gray,
    textAlign: 'left',
  },
});

export const menu = StyleSheet.create({
  input: {},
  placeholder: { display: 'none' },
  'icon-wrapper': {},
  icon: {},
});
