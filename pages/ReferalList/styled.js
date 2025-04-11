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
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray600,
    marginBottom: Gaps.g24,
  },
  text: {
    fontSize: 14,
    color: Colors.gray600,
    marginBottom: Gaps.g8,
  },
  section: {
    marginTop: Gaps.g40,
    marginBottom: Gaps.g24,
  },
  referralItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  referralName: {
    fontSize: 16,
    fontWeight: '500',
  },
  referralPhone: {
    fontSize: 14,
    color: '#666',
  },
  referralDate: {
    fontSize: 12,
    color: '#999',
  },

  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
