import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.gray50,
    flex: 1,
    padding: Gaps.g16,
    paddingTop: 40,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  addReviewButton: {
    alignSelf: 'flex-end',
  },
  addReviewText: {
    color: '#007AFF',
    fontSize: 16,
  },
  ratingSection: {},
  ratingNumber: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  ratingSubtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  ratingBars: {
    marginTop: 0,
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  ratingStars: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBarContainer: {
    flex: 1,
    height: 3,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 8,
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: '#FFD700',
  },
  ratingCount: {
    width: 30,
    textAlign: 'right',
    fontSize: 14,
    color: '#666',
  },
  reviewsList: {
    flex: 1,
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingBottom: 8,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '500',
  },
  reviewDate: {
    fontSize: 14,
    color: '#666',
  },
  moreButton: {
    padding: 8,
  },
  moreButtonText: {
    fontSize: 20,
    color: '#666',
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  reviewText: {
    fontSize: 16,
    lineHeight: 22,
  },
});
