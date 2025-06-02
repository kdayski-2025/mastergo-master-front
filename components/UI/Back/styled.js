import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../../shared/tokens';

export default StyleSheet.create({
  back: {
    flex: 'flex',
    flexDirection: 'row',
    width: 70,
    height: 24,
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 100,
  },
  text: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: 500,
    color: Colors.black,
    marginBottom: 1,
  },
});
