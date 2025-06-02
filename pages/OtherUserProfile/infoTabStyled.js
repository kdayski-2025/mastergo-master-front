import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 15,
		paddingTop: 20,
	},
	section: {
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: '600',
		color: Colors.black,
		marginBottom: 8,
	},
	sectionText: {
		fontSize: 14,
		color: Colors.black,
		lineHeight: 20,
		fontWeight: '400',
	},
	serviceItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(0, 0, 0, 0.1)',
	},
	serviceName: {
		fontSize: 14,
		color: Colors.black,
	},
	servicePrice: {
		fontSize: 14,
		fontWeight: '600',
		color: Colors.black,
	},
	contactItem: {
		fontSize: 14,
		color: Colors.black,
		marginBottom: 8,
	},
}); 