import { StyleSheet } from 'react-native';
import { Colors, Gaps, Radius } from '../../shared/tokens';

export default StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: Gaps.g12,
    marginBottom: Gaps.g12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: Radius.medium,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  description: {
    color: Colors.gray,
    marginBottom: 4,
  },
  price: {
    color: Colors.orange,
    fontWeight: '500',
  },
  target: {
    backgroundColor: Colors.orange,
  },
  navigate: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderTopRightRadius: Radius.medium,
    borderBottomRightRadius: Radius.medium,
  },
});
