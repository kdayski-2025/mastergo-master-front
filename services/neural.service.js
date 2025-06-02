import Constants from 'expo-constants';
import { BehaviorSubject } from 'rxjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import { Alert } from 'react-native';
import { generateUUID } from '../lib/lib';

const SOCKET_URL = `${Constants?.expoConfig?.api?.socket}:${Constants?.expoConfig?.api?.socketPort}`
const MAX_IMAGE_SIZE = Constants?.expoConfig?.api?.maxImageSize || 5 * 1024 * 1024; // 5MB по умолчанию

class NeuralService {
	initialState = {
		loading: false,
		error: null,
		messages: [],
		messageReceived: false,
		messageRead: false,
		socket: null,
		connected: false,
		roomType: null,
		typing: false,
		myUserId: null
	};

	state$ = new BehaviorSubject(this.initialState);

	async connectSocket(roomType, customId) {
		// Если уже есть сокет и комната того же типа, не переподключаемся
		if (this.state$.value.socket && this.state$.value.roomType === roomType) {
			return;
		}

		// Если есть активное соединение, отключаем его
		if (this.state$.value.socket) {
			this.disconnectSocket();
		}

		// Устанавливаем состояние загрузки
		this.state$.next({
			...this.state$.value,
			loading: true,
			roomType
		});

		try {
			// Получаем токен из AsyncStorage
			const token = await AsyncStorage.getItem('auth_token');

			// Создаем новое подключение к сокету с токеном
			const socket = io(`${SOCKET_URL}`, {
				transports: ['websocket'],
				autoConnect: true,
				auth: {
					token
				}
			});

			// Добавляем таймаут для обработки неудачного подключения
			const connectionTimeout = setTimeout(() => {
				if (!this.state$.value.connected) {
					Alert.alert('Ошибка соединения', 'Не удалось подключиться к серверу.');
					this.disconnectSocket();
				}
			}, 5000); // 5 секунд на подключение

			socket.on('connect', () => {
				console.log('Socket connected');
				clearTimeout(connectionTimeout); // Очищаем таймаут при успешном подключении

				// Подключаемся к соответствующей комнате
				socket.emit('joinChat', { type: roomType, customId });
				console.log(`Joined room: ${roomType}`);

				this.state$.next({
					...this.state$.value,
					socket,
					connected: true,
					loading: false
				});
			});

			socket.on('disconnect', () => {
				console.log('Socket disconnected');
				this.state$.next({
					...this.state$.value,
					connected: false,
					loading: false
				});
			});

			socket.on('chatHistory', (messages) => {
				console.log('Received history:', messages);
				// Фильтруем дубликаты, оставляя только серверные сообщения
				let filteredMessages = messages.filter((msg, index, self) =>
					index === self.findIndex((m) =>
						m.content === msg.content && !msg.client
					)
				);
				filteredMessages = filteredMessages.map(msg => ({
					...msg,
					received: true,
				}));
				this.state$.next({
					...this.state$.value,
					messages: filteredMessages
				});
			});

			socket.on('chatJoined', ({ interlocutorName, ...rest }) => {
				this.state$.next({
					...this.state$.value,
					interlocutorName,
					myUserId: rest.userId,
				});
			});

			socket.on('message', (message) => {
				console.log('Received message:', message);
				// Заменяем клиентское сообщение на серверное, если контент совпадает
				const messages = this.state$.value.messages.map(msg =>
					(msg.content === message.content) ? message : msg
				);
				// Если сообщение не было заменено, добавляем его
				if (!messages.some(msg => msg.content === message.content)) {
					messages.push(message);
				}
				this.state$.next({
					...this.state$.value,
					messages,
					typing: false,
				});
			});

			socket.on('messageReceived', ({ uid, id }) => {
				console.log('Received message:', uid);
				const messages = this.state$.value.messages.map((msg) => {
					console.log('Checking message:', { msgId: msg.id, msgUid: msg.uid, match: msg.uid === uid || msg.id === id });
					if (msg.uid === uid || msg.id === id) {
						return { ...msg, received: true };
					}
					return msg;
				});
				this.state$.next({
					...this.state$.value,
					messages
				});
			});

			socket.on('messageRead', ({ id, readAt, uid, ...rest }) => {
				console.log('MessageRead event received:', { id, readAt, uid, ...rest });
				console.log('Current messages:', JSON.stringify(this.state$.value.messages, null, 2));

				const messages = this.state$.value.messages.map((msg) => {
					console.log('Checking message:', { msgId: msg.id, msgUid: msg.uid, match: msg.uid === uid || msg.id === id });
					if (msg.uid === uid || msg.id === id) {
						console.log('Found matching message, adding readAt:', readAt);
						return { ...msg, readAt, received: true };
					}
					return msg;
				});

				console.log('Updated messages:', JSON.stringify(messages, null, 2));
				this.state$.next({
					...this.state$.value,
					messages
				});
			});

			socket.on('typingStarted', ({ userId, userName }) => {
				this.state$.next({
					...this.state$.value,
					typing: true
				});
			});

			socket.on('typingStopped', ({ userId, userName }) => {
				this.state$.next({
					...this.state$.value,
					typing: false
				});
			});

			socket.on('error', (error) => {
				console.error('Socket error:', error);
				Alert.alert('Ошибка', error.message);
				this.state$.next({
					...this.state$.value,
					error: error.message,
					loading: false
				});
			});

		} catch (error) {
			console.error('Error connecting to socket:', error);
			this.state$.next({
				...this.state$.value,
				error: error.message,
				loading: false
			});
		}
	}

	disconnectSocket() {
		const socket = this.state$.value.socket;
		if (socket) {
			socket.disconnect();
			this.state$.next({
				...this.state$.value,
				socket: null,
				connected: false
			});
		}
	}

	async sendMessage(content, photo) {
		// Если нет соединения, пытаемся подключиться
		if (!this.state$.value.socket || !this.state$.value.connected) {
			this.connectSocket();
			// Возвращаем ошибку, так как сообщение не может быть отправлено без соединения
			return { success: false, error: 'No connection' };
		}

		try {
			// Подготавливаем изображение (если есть)
			let photoData = null;
			if (photo) {
				// Проверяем размер изображения
				const fileSize = await this.getFileSize(photo.uri);

				if (fileSize > MAX_IMAGE_SIZE) {
					const maxSizeMB = MAX_IMAGE_SIZE / (1024 * 1024);
					return {
						success: false,
						error: `Размер изображения превышает ${maxSizeMB}MB`
					};
				}

				const base64 = await this.imageToBase64(photo.uri);
				photoData = {
					uri: base64,
					name: photo.uri.split('/').pop(),
					type: this.getImageType(photo.uri)
				};
			}
			const uid = generateUUID();
			// Создаем сообщение пользователя
			const userMessage = {
				uid: uid,
				content,
				image: photo ? photo.uri : null,
				createdAt: new Date().toISOString(),
				isUser: true,
			};
			// Добавляем сообщение в локальную историю
			const messages = [...this.state$.value.messages, userMessage];
			this.state$.next({
				...this.state$.value,
				messages
			});
			// Отправляем сообщение через сокет
			this.state$.value.socket.emit('message', {
				uid,
				content,
				image: photoData
			});

			return { success: true };
		} catch (error) {
			console.error('Error sending message:', error);
			this.state$.next({
				...this.state$.value,
				error: error.message
			});
			return { success: false, error: error.message };
		}
	}

	// Вспомогательный метод для конвертации изображения в base64
	async imageToBase64(uri) {
		try {
			const response = await fetch(uri);
			const blob = await response.blob();
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => resolve(reader.result.split(',')[1]);
				reader.onerror = reject;
				reader.readAsDataURL(blob);
			});
		} catch (error) {
			console.error('Error converting image to base64:', error);
			throw error;
		}
	}

	// Вспомогательный метод для определения типа изображения
	getImageType(uri) {
		const match = /\.(\w+)$/.exec(uri.split('/').pop());
		return match ? `image/${match[1].toLowerCase()}` : 'image/jpeg';
	}

	// Вспомогательный метод для определения размера файла
	async getFileSize(uri) {
		try {
			const response = await fetch(uri);
			const blob = await response.blob();
			return blob.size;
		} catch (error) {
			console.error('Error getting file size:', error);
			throw error;
		}
	}

	changeRoomType(roomType, customId) {
		this.connectSocket(roomType, customId);
	}

	init(roomType) {
		// Подключаемся к сокету, который запросит историю после подключения
		this.connectSocket(roomType);
	}

	cleanup() {
		this.disconnectSocket();
	}

	sendTypingEvent() {
		if (this.state$.value.socket) {
			this.state$.value.socket.emit('typing');
		}
	}

	messageRead(id) {
		console.log('messageRead', id);
		if (this.state$.value.socket) {
			this.state$.value.socket.emit('messageRead', { id });
		}
	}
}

const NeuralServiceInstance = new NeuralService();
export default NeuralServiceInstance; 