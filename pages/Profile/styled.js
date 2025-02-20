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
  header: {
    marginTop: Gaps.g40,

    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reviews: {
    color: Colors.greenDark,
    fontSize: 16,
    lineHeight: 22,
  },
});
