import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';

export const tabsStyles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  "tab-active": {
    borderBottomColor: Colors.greenDark,
  },
  "tab-text": {
    color: '#666',
    fontSize: 16,
  },
  "active-tab-text": {
    color: Colors.greenDark,
    fontWeight: '500',
  },
  "tab-content": {
    marginBottom: 250,
  },
  "tab-item": {
    marginBottom: Gaps.g24,
  },
});

export const tabRouterStyles = StyleSheet.create({
  "tab-bar": {
    backgroundColor: Colors.white,
    borderTopWidth: 0,
    height: 60,
    paddingBottom: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  "tab-item": {
    padding: Gaps.g12,
  },
  "tab-label": {
    color: Colors.green,
    fontSize: 12,
    fontWeight: '500',
  },
});
