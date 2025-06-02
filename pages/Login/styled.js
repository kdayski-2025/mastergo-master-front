import { StyleSheet, ImageBackground } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';

export default StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 15,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },

  title: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.white,
    width: 300,
  },
  subtitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '400',
  },
});
