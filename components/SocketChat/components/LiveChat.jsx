import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity, Image, Keyboard, FlatList } from 'react-native';
import { Colors } from '../../../shared/tokens';
import Container from '../../UI/Container/Container';
import Input from '../../Input/Input';
import useNeural from '../../../hooks/useNeural';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styled';
import NeuralServiceInstance from '../../../services/neural.service';
import * as handle from '../handle';
import TypingIndicator from './TypingIndicator';
import Message from './Message';
import Back from '../../UI/Back/Back';

export default function LiveChat({ roomType }) {
  const { messages, interlocutorName, typing, myUserId } = useNeural();
  const [inputText, setInputText] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [sending, setSending] = useState(false);
  const flatListRef = useRef(null);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }) => {
      viewableItems.forEach(({ item }) => {
        if (item.senderId !== myUserId) {
          if (!item.readAt) NeuralServiceInstance.messageRead(item.id);
        }
      });
    },
    [myUserId]
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    return () => {
      showSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (inputText.trim() && NeuralServiceInstance.state$.value.socket) {
      NeuralServiceInstance.sendTypingEvent();
    }
  }, [inputText]);

  // Основной чат с историей
  return (
    <Container safe bgColor={Colors.white} pb={0} pt={15}>
      {roomType === 'ai' && <Back />}
      {roomType === 'ai' && (
        <>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Помощь AI</Text>
            <TypingIndicator />
          </View>
          <Text style={styles.subHeader}>Рекомендация от AI</Text>
        </>
      )}
      {roomType === 'request' && (
        <>
          <View style={styles.typingContainer}>
            <Text style={styles.header}>{interlocutorName}</Text>
            <TypingIndicator />
          </View>
        </>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => (
            <Message item={item} roomType={roomType} isUser={item.isUser || item.senderId === myUserId} />
          )}
          keyExtractor={(item) => (item?.id && item?.id?.toString()) || (item?.uid && item?.uid?.toString())}
          contentContainerStyle={styles.messagesList}
          keyboardDismissMode="interactive"
          maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />

        <View style={styles.inputFooterContainer}>
          <Input
            style={[styles.input, { marginBottom: 0 }]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Задайте вопрос..."
            multiline
          />
        </View>
        <View style={styles.photoContainer}>
          {selectedPhoto ? (
            <View style={styles.photoPreviewSmall}>
              <Image source={{ uri: selectedPhoto.uri }} style={styles.photoPreviewSmallImage} />
              <TouchableOpacity
                style={styles.removePhotoSmallButton}
                onPress={() => handle.handleRemovePhoto(setSelectedPhoto)}
              >
                <MaterialIcons name="close" size={16} color={Colors.white} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.photoButtonSmall}
              onPress={() => handle.handlePhotoOptions(setSelectedPhoto)}
            >
              <MaterialIcons name="add-photo-alternate" size={24} color={Colors.gray} />
            </TouchableOpacity>
          )}

          <View style={styles.sendButtonContainer}>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() =>
                handle.handleSendMessage({
                  setInputText,
                  setSelectedPhoto,
                  sending,
                  setSending,
                  inputText,
                  selectedPhoto,
                })
              }
              disabled={sending || !inputText.trim()}
            >
              <Icon name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}
