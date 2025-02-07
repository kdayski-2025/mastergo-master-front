import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';

export const styles = StyleSheet.create({
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
  titleOrders: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
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
  orders: {},
  sectionOrder: {
    marginBottom: Gaps.g24,
  },
  sectionOrderScroll: {
    marginBottom: 250,
  },
  tabContainer: {
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
  activeTab: {
    borderBottomColor: Colors.greenDark,
  },
  tabText: {
    color: '#666',
    fontSize: 16,
  },
  activeTabText: {
    color: Colors.greenDark,
    fontWeight: '500',
  },
});
