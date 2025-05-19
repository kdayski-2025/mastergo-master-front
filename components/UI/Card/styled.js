import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../../shared/tokens';

export default StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: Colors.white,
    boxShadow: '-1px 5px 20px 0 rgba(79, 79, 79, 0.15)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 15,
  },
  titleWrapper: {
    marginBottom: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  tableWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  fixedRow: {
    width: 100,
  },
  adress: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  },

  //delete
  title: {
    fontSize: 18,
    fontWeight: 600,
    color: Colors.black,
  },
  description: {
    fontSize: 14,
    fontWeight: 500,
    color: Colors.black,
  },
  textCursive: {
    fontSize: 14,
    fontWeight: 300,
    color: Colors.black,
  },
  row: {
    fontSize: 16,
    fontWeight: 600,
    color: '#373737',
  },
});
