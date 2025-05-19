import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../../shared/tokens';

export const selectorStyles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  trigger: {
    padding: Gaps.small,
    borderWidth: 1,
    borderColor: Colors.gainsboro,
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  triggerText: {
    color: Colors.gray800,
  },
  selectedTriggerText: {
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    top: '99%',
    borderRadius: 4,
    zIndex: 3,
  },
  option: {
    padding: Gaps.small,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.gainsboro,
  },
  optionText: {
    color: Colors.text,
    padding: 10,
    backgroundColor: Colors.gray97,
    fontWeight: 300,
    fontSize: 14,
  },
  pressedOptionText: {
    fontWeight: 'bold',
  },
  lableStyle: {
    fontWeight: 400,
    fontSize: 14,
    color: Colors.gray800,
    marginBottom: 6,
  },
});
