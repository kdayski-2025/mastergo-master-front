import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  container: {
    flex: 0
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.black,
    marginBottom: Gaps.g8,
  },
  header: {
    marginBottom: 12,
    flexDirection: 'row',
    gap: Gaps.g12,
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  reviews: {
    color: Colors.greenDark,
    fontSize: 16,
    lineHeight: 22,
  },
  infoContainer: {

  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(165, 175, 212, 0.15)',
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.black,
  },
  master: {
    position: 'absolute',
    top: 66,
    left: 15,
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  // Tabs styles
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.orange,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.gray,
  },
  activeTabText: {
    color: Colors.black,
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
  },
  // Скрытый контент
  hidden: {
    opacity: 0,
  },
  // Стиль для индикатора загрузки
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 200,
  },
});
