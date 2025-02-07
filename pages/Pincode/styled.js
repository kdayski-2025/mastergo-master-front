import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 48,
    flex: 1,
    gap: Gaps.g40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  box: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    width: 20,
    height: 20,
    borderRadius: 45,
    marginHorizontal: 10,
  },
});
