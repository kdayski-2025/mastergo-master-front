import { StyleSheet } from 'react-native';
import { Colors } from '../../shared/tokens';

export default StyleSheet.create({
	empty: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 20,
	},
	message: {
		color: Colors.gray,
		fontSize: 16,
	},
});
