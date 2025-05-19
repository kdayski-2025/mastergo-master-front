import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../styled';
import Constants from 'expo-constants';
import SingleCheckIcon from '../../../assets/icons/single-check.svg';
import DoubleCheckIcon from '../../../assets/icons/double-check.svg';
import PendingIcon from '../../../assets/icons/pending.svg';

export default function Message({ item, roomType, isUser }) {
  const imagePath = `${Constants?.expoConfig?.api?.url}${
    Constants?.expoConfig?.api?.port ? `:${Constants?.expoConfig?.api?.port}` : ''
  }${item.imagePath}`;
  const imageUrl = item.image || imagePath;
  if (isUser && roomType === 'ai') return null;
  return (
    <View style={[styles.messageContainer, isUser ? styles.userMessageContainer : styles.aiMessageContainer]}>
      {(item.image || item.imagePath) && (
        <TouchableOpacity style={styles.messagePhotoContainer}>
          <Image source={{ uri: imageUrl }} style={styles.messagePhoto} resizeMode="cover" />
        </TouchableOpacity>
      )}
      <View style={styles.messageTextContainer}>
        <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.aiMessageText]}>{item.content}</Text>
        {roomType === 'request' && (
          <View style={styles.messageTimeContainer}>
            <Text style={styles.messageTime}>
              {new Date(item.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            {isUser && (
              <>
                {!item.id && !item.readAt && <PendingIcon width={20} height={20} />}
                {item.id && !item.readAt && <SingleCheckIcon width={20} height={20} />}
                {item.id && item.readAt && <DoubleCheckIcon width={20} height={20} />}
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
