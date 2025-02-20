import { useEffect, useState } from 'react';
import ChatServiceInstance from '../services/chat.service';

const useChat = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const chat$ = ChatServiceInstance.state$.subscribe((state) => {
            if (JSON.stringify(messages) !== JSON.stringify(state.messages)) {
                setMessages(state.messages);
            }
            if (loading !== state.loading) {
                setLoading(state.loading);
            }
            if (error !== state.error) {
                setError(state.error);
            }
        });

        return () => {
            chat$.unsubscribe();
        };
    }, [messages, loading, error]);

    const sendMessage = async (requestId, text) => {
        try {
            await ChatServiceInstance.sendMessage(requestId, text);
        } catch (error) {
            setError(error.message);
        }
    };

    const createRoom = async (requestId) => {
        try {
            return await ChatServiceInstance.createChatRoom(requestId);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const initChat = async (requestId) => {
        try {
            return await ChatServiceInstance.initChat(requestId);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    useEffect(() => {
        return () => {
            ChatServiceInstance.stopAutoRefresh();
        };
    }, []);

    return {
        error,
        loading,
        messages,
        sendMessage,
        createRoom,
        initChat
    };
};

export default useChat; 