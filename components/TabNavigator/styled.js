import { StyleSheet } from 'react-native';

import { Colors, Gaps } from '../../shared/tokens';

export const styles = StyleSheet.create({
  tabBar: {
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
  tabItem: {
    padding: Gaps.g12,
  },
  tabLabel: {
    color: Colors.green,
    fontSize: 12,
    fontWeight: '500',
  },
});
