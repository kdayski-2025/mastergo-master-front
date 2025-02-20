import { StyleSheet } from 'react-native';
import { Colors, Gaps, Radius, Shadows } from '../../shared/tokens';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.gray50,
		paddingTop: 40,
	},
	messagesList: {
		padding: Gaps.g16,
	},
	messageContainer: {
		maxWidth: '80%',
		marginVertical: Gaps.g8,
		padding: Gaps.g12,
		borderRadius: Radius.medium,
		...Shadows.small,
	},
	leftMessage: {
		alignSelf: 'flex-start',
		backgroundColor: Colors.green,
		borderBottomLeftRadius: Radius.small,
	},
	rightMessage: {
		alignSelf: 'flex-end',
		backgroundColor: Colors.white,
		borderBottomRightRadius: Radius.small,
		borderWidth: 1,
		borderColor: Colors.gray200,
	},
	messageText: {
		fontSize: 16,
		lineHeight: 20,
	},
	leftMessageText: {
		color: Colors.white,
	},
	rightMessageText: {
		color: Colors.gray900,
	},
	messageTime: {
		fontSize: 12,
		marginTop: Gaps.g4,
		color: Colors.gray500,
		alignSelf: 'flex-end',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: Gaps.g12,
		padding: Gaps.g12,
		backgroundColor: Colors.white,
		borderTopWidth: 1,
		borderTopColor: Colors.gray200,
	},
	input: {
		flex: 1,
		minHeight: 48,
		maxHeight: 120,
		padding: Gaps.g12,
		borderRadius: Radius.medium,
		backgroundColor: Colors.gray50,
		borderWidth: 1,
		borderColor: Colors.gray200,
	},
	sendButton: {
		height: 48,
		paddingHorizontal: Gaps.g16,
		borderRadius: Radius.medium,
	},
	sendButtonText: {
		fontSize: 16,
	},
	senderName: {
		fontSize: 12,
		color: Colors.white,
		marginBottom: 4,
	},
});
