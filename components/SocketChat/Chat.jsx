import React, { useEffect, useRef } from 'react';
import useNeural from '../../hooks/useNeural';
import NeuralServiceInstance from '../../services/neural.service';
import { useFocusEffect } from '@react-navigation/native';
import EmptyChat from './components/EmptyChat';
import Loading from './components/Loading';
import ConnectionLost from './components/ConnectionLost';
import LiveChat from './components/LiveChat';
import OutOfTokens from './components/OutOfTokens';

export default function Chat({ roomType, requestId }) {
  const { loading, error, messages, connected, sendMessage, typing } = useNeural();
  const flatListRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      NeuralServiceInstance.changeRoomType(roomType, requestId);
      return () => {
        // Очистка при уходе с экрана
        NeuralServiceInstance.cleanup();
      };
    }, [])
  );

  useEffect(() => {
    if (messages && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // return <OutOfTokens />;

  // Если история еще не проверена или идет загрузка
  if (loading) {
    return <Loading />;
  }

  if (!loading && !connected) {
    return <ConnectionLost />;
  }

  // Если истории нет, показываем экран начала работы
  if (!messages.length) {
    return <EmptyChat roomType={roomType} />;
  }

  // Основной чат с историей
  return <LiveChat roomType={roomType} />;
}
