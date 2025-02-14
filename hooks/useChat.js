import { useEffect, useState } from 'react';
import ChatServiceInstance from '../services/chat.service';

const useChat = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const chat$ = ChatServiceInstance.state$.subscribe((state) => {
            setLoading(state.loading);
            setError(state.error);
            setMessages(state.messages);
        });

        return () => {
            chat$.unsubscribe();
        };
    }, []);

    return {
        error,
        loading,
        messages,
    };
};

export default useChat; 