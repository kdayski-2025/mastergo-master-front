import { StyleSheet } from 'react-native';
import { Colors, Gaps, Radius, Shadows } from '../../shared/tokens';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: Radius.large,
    padding: Gaps.g24,
    marginBottom: Gaps.g24,
    ...Shadows.medium,
  },
  content: {
    marginBottom: Gaps.g24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: Gaps.g16,
    color: Colors.gray900,
  },
  description: {
    fontSize: 16,
    color: Colors.gray700,
    marginBottom: Gaps.g16,
    lineHeight: 24,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Gaps.g8,
  },
  address: {
    fontSize: 14,
    color: Colors.gray600,
    fontStyle: 'italic',
  },
  photoSection: {},
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray800,
    marginBottom: Gaps.g12,
  },
  photoScroll: {
    paddingRight: Gaps.g16,
    gap: Gaps.g12,
  },
  photoWrapper: {
    borderRadius: Radius.small,
    overflow: 'hidden',
    ...Shadows.small,
  },
  thumbnail: {
    width: 100,
    height: 100,
    backgroundColor: Colors.gray100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
  closeText: {
    color: Colors.black,
    fontSize: 16,
  },
  fullImage: {
    width: '90%',
    height: '80%',
    borderRadius: 10,
  },
});
