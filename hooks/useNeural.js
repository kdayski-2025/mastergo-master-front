import { useEffect, useState } from 'react';
import NeuralServiceInstance from '../services/neural.service';
import { LayoutAnimation } from 'react-native';

const useNeural = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [messages, setMessages] = useState([]);
	const [connected, setConnected] = useState(false);
	const [typing, setTyping] = useState(false);
	const [interlocutorName, setInterlocutorName] = useState(null);
	const [myUserId, setMyUserId] = useState(null);
	useEffect(() => {
		const neural$ = NeuralServiceInstance.state$.subscribe((state) => {
			LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
			setMessages(state.messages);
			setTyping(state.typing);
			setInterlocutorName(state.interlocutorName);
			setLoading(state.loading);
			setError(state.error);
			setConnected(state.connected);
			setMyUserId(state.myUserId);
		});

		return () => {
			neural$.unsubscribe();
		};
	}, []);

	const sendMessage = async (text, photo) => {
		try {
			const result = await NeuralServiceInstance.sendMessage(text, photo);
			return result;
		} catch (error) {
			setError(error.message);
			return { success: false, error: error.message };
		}
	};

	return {
		error,
		loading,
		messages,
		connected,
		typing,
		interlocutorName,
		myUserId,
		sendMessage,
	};
};

export default useNeural; 