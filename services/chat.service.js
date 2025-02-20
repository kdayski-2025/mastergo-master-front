import { BehaviorSubject } from 'rxjs';
import { GET, POST } from '../api/fetch-api';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ChatService {
    initialState = {
        loading: false,
        error: null,
        messages: []
    };

    state$ = new BehaviorSubject(this.initialState);

    intervalId = null;

    async get(requestId) {
        if (!requestId) {
            throw new Error('Request ID is required');
        }

        if (this.state$.value.loading) {
            return;
        }

        this.state$.next({
            ...this.initialState,
            loading: true,
        });

        try {
            const result = await GET(`/chat/${requestId}`);
            const master = result.data.users.find(u => u.role === 'master');
            const messagesWithSender = result.data.messages.map(message => {
                const user = result.data.users.find(u => u.id === message.userId);
                return {
                    ...message,
                    user: user || null,
                    senderId: message.userId,
                    role: user?.role,
                    masterName: master?.name
                };
            });
            
            this.state$.next({
                loading: false,
                error: null,
                messages: messagesWithSender
            });
        } catch (error) {
            this.state$.next({
                loading: false,
                error: error.message,
                messages: []
            });
            throw new Error(error.message);
        }
    }

    async sendMessage(requestId, text) {
        try {
            await POST(`/chat/${requestId}`, { text });
            await this.get(requestId);
        } catch (error) {
            this.state$.next({
                ...this.state$.value,
                error: error.message
            });
            throw new Error(error.message);
        }
    }

    async createChatRoom(requestId) {
        try {
            const result = await POST('/chat', { requestId });
            return result.roomId; // Предполагаем, что API возвращает ID созданной комнаты
        } catch (error) {
            this.state$.next({
                ...this.state$.value,
                error: error.message
            });
            throw new Error(error.message);
        }
    }

    async initChat(requestId) {
        await this.get(requestId);
        this.startAutoRefresh(requestId);
        return requestId;
    }

    startAutoRefresh(requestId) {
        this.intervalId = setInterval(async () => {
            try {
                const result = await GET(`/chat/${requestId}`);
                const master = result.data.users.find(u => u.role === 'master');
                const messagesWithSender = result.data.messages.map(message => {
                    const user = result.data.users.find(u => u.id === message.userId);
                    return {
                        ...message,
                        user: user || null,
                        senderId: message.userId,
                        role: user?.role,
                        masterName: master?.name
                    };
                });
                
                // Обновляем только если сообщения изменились
                if (JSON.stringify(this.state$.value.messages) !== JSON.stringify(messagesWithSender)) {
                    this.state$.next({
                        ...this.state$.value,
                        messages: messagesWithSender
                    });
                }
            } catch (error) {
                console.error('Ошибка обновления чата:', error);
            }
        }, 5000);
    }

    stopAutoRefresh() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    async getCookie(name) {
        try {
            const value = await AsyncStorage.getItem(name);
            return value;
        } catch (e) {
            return null;
        }
    }

    async setCookie(name, value) {
        try {
            await AsyncStorage.setItem(name, value);
        } catch (e) {
            console.error('Failed to set cookie', e);
        }
    }
}

const ChatServiceInstance = new ChatService();
export default ChatServiceInstance;
