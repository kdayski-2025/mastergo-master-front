import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	ratingSection: {
		alignItems: 'center',
		marginVertical: 20,
	},
	ratingNumber: {
		fontSize: 48,
		fontWeight: 'bold',
		color: Colors.black,
	},
	ratingSubtext: {
		fontSize: 14,
		color: Colors.gray,
		marginVertical: 5,
	},
	ratingBars: {
		width: '100%',
		marginTop: 15,
	},
	ratingBar: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	ratingStars: {
		flexDirection: 'row',
		width: 80,
	},
	ratingBarContainer: {
		flex: 1,
		height: 8,
		backgroundColor: '#E0E0E0',
		borderRadius: 4,
		marginHorizontal: 10,
	},
	ratingBarFill: {
		height: '100%',
		backgroundColor: '#FFD700',
		borderRadius: 4,
	},
	ratingCount: {
		width: 30,
		textAlign: 'right',
		fontSize: 12,
		color: Colors.gray,
	},
	reviewsList: {
		flex: 1,
		paddingHorizontal: 15,
		paddingTop: 20,
	},
	reviewItem: {
		padding: 12,
		marginBottom: 12,
		backgroundColor: 'white',
		borderRadius: 8,
		maxHeight: 150,
		shadowColor: '#4F4F4F',
		shadowOffset: { width: -1, height: 0 },
		shadowOpacity: 0.15,
		shadowRadius: 20,
		elevation: 5,
	},
	reviewItemExpanded: {
		maxHeight: null,
	},
	reviewHeader: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	reviewerAvatar: {
		width: 46,
		height: 46,
		marginRight: 10,
	},
	reviewerInfo: {
		flex: 1,
	},
	reviewerName: {
		fontSize: 14,
		fontWeight: '600',
		color: Colors.black,
	},
	reviewDate: {
		fontSize: 12,
		fontWeight: '400',
		color: Colors.black,
		marginTop: 3,
	},
	moreButton: {
		padding: 5,
	},
	moreButtonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.gray,
	},
	starsContainer: {
		flexDirection: 'row',
		gap: 2,
		marginTop: 7,
		marginBottom: 'auto',
	},
	reviewText: {
		paddingTop: 10,
		fontSize: 14,
		lineHeight: 20,
		color: Colors.black,
		fontWeight: '400',
	},
	reviewTextCollapsed: {
		height: 70,
		overflow: 'hidden',
	},
	collapseButton: {
		marginTop: 10,
		alignSelf: 'left',
		paddingVertical: 6,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
	},
	collapseButtonText: {
		fontSize: 14,
		fontWeight: '400',
		color: Colors.black,
	},
	noReviews: {
		padding: 20,
		alignItems: 'center',
	},
	noReviewsText: {
		fontSize: 16,
		color: Colors.gray,
	},
}); 