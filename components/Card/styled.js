import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: Gaps.g12,
    marginBottom: Gaps.g12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  address: {
    color: Colors.gray,
    marginBottom: 4,
  },
  price: {
    color: Colors.green,
    fontWeight: '500',
  },
});
