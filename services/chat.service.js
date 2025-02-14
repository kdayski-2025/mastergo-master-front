import { BehaviorSubject } from 'rxjs';
import { GET } from '../api/fetch-api';

class ChatService {
    initialState = {
        loading: false,
        error: null,
        messages: []
    };

    state$ = new BehaviorSubject(this.initialState);

    async get(roomId) {
        if (this.state$.value.loading) {
            return;
        }

        this.state$.next({
            ...this.initialState,
            loading: true,
        });

        try {
            const result = await GET(`/chat/${roomId}`);
            this.state$.next({
                loading: false,
                error: null,
                messages: result
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
}

const ChatServiceInstance = new ChatService();
export default ChatServiceInstance;
