import { StyleSheet } from 'react-native';
import { Colors, Gaps, Radius, Shadows } from '../../shared/tokens';

export default StyleSheet.create({
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
    paddingLeft: Gaps.g12,
    paddingRight: Gaps.g12,
  },
  wrapper: {
    paddingLeft: Gaps.g12,
    paddingRight: Gaps.g12,
    flex: 1,
  },
  chatWrapper: {
    flex: 1,
    marginTop: Gaps.g24,
  },
  'photo-section': {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Gaps.g24,
    backgroundColor: Colors.white,
    borderRadius: Radius.medium,
    ...Shadows.small,
  },

  wrapperFeedback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Gaps.g16,
  },
});
