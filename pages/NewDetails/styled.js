import { StyleSheet } from 'react-native';
import { Colors, Gaps, Radius, Shadows } from '../../shared/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray50,
  },
  header: {
    height: 60,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingHorizontal: Gaps.g16,
  },
  content: {
    flexGrow: 1,
    padding: Gaps.g16,
  },
  section: {
    marginBottom: Gaps.g24,
    backgroundColor: Colors.white,
    borderRadius: Radius.medium,
    padding: Gaps.g16,
    ...Shadows.small,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: Gaps.g12,
    color: Colors.black,
  },
  description: {
    fontSize: 16,
    color: Colors.gray700,
    marginBottom: Gaps.g12,
    lineHeight: 24,
  },
  address: {
    fontSize: 14,
    color: Colors.gray600,
    fontStyle: 'italic',
  },
  thumbnail: {
    width: 120,
    height: 120,
    borderRadius: Radius.small,
    marginRight: Gaps.g12,
    backgroundColor: Colors.gray100,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Gaps.g24,
    backgroundColor: Colors.white,
    borderRadius: Radius.medium,
    padding: Gaps.g16,
    ...Shadows.small,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: Radius.small,
    padding: Gaps.g12,
    marginRight: Gaps.g12,
    fontSize: 16,
    backgroundColor: Colors.gray50,
  },
  buttonWrapper: {
    width: 140,
    padding: Gaps.g12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
