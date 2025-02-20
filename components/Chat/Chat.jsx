import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import styles from './styled';
import useChat from '../../hooks/useChat';
import SendButton from '../SendButton/SendButton';
import Input from '../Input/Input';

export default function ActiveDetailsScreen({ requestId }) {
  const { loading, error, messages, sendMessage, initChat } = useChat();
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    initChat(requestId);
  }, [requestId]);

  const renderMessage = React.useCallback(({ item }) => {
    const isClient = item.user?.role === 'client';

    return (
      <View style={[styles.messageContainer, isClient ? styles.leftMessage : styles.rightMessage]}>
        {isClient && item.user?.name && <Text style={styles.senderName}>{item.user.name}</Text>}
        <Text style={[styles.messageText, isClient ? styles.leftMessageText : styles.rightMessageText]}>
          {item.text}
        </Text>
        <Text style={styles.messageTime}>
          {new Date(item.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    );
  }, []);

  const handleSend = async () => {
    if (newMessage.trim()) {
      try {
        await sendMessage(requestId, newMessage);
        setNewMessage('');
      } catch (error) {
        console.error('Ошибка отправки сообщения:', error);
      }
    }
  };

  if (loading) {
    return <Text>Загрузка...</Text>;
  }

  if (error) {
    return <Text>Ошибка: {error}</Text>;
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messagesList}
        extraData={messages}
        keyboardDismissMode="interactive"
      />
      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Введите сообщение..."
          multiline
        />
        <SendButton onPress={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
}
