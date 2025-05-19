import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import { Colors } from '../../../shared/tokens';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styled';
import NeuralServiceInstance from '../../../services/neural.service';
import * as handle from '../handle';
import { placeholder } from '../enum';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import ArrowsIcon from '../../../assets/icons/arrows.svg';
import AttachIcon from '../../../assets/icons/attach.svg';

export default function Actions({ roomType }) {
  const [inputText, setInputText] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (inputText.trim() && NeuralServiceInstance.state$.value.socket) {
      NeuralServiceInstance.sendTypingEvent();
    }
  }, [inputText]);

  if (roomType === 'ai') {
    return (
      <>
        {selectedPhoto ? (
          <View style={{ ...styles.inputContainer, flexDirection: 'column' }}>
            <Image source={{ uri: selectedPhoto.uri }} style={styles.photoPreviewSmallImage} />
            <TouchableOpacity
              style={styles.removePhotoSmallButton}
              onPress={() => handle.handleRemovePhoto({ setSelectedPhoto })}
            >
              <MaterialIcons name="close" size={16} color={Colors.white} />
            </TouchableOpacity>
            <TextInput
              style={styles.combinedInput}
              placeholder="Опишите проблему или прикрепите фото..."
              placeholderTextColor={Colors.gray800}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.attachButton}
              onPress={() => handle.handlePhotoOptions({ setSelectedPhoto })}
            >
              <AttachIcon name="attach-file" size={24} color={Colors.gray} />
            </TouchableOpacity>
            <TextInput
              style={styles.combinedInput}
              placeholder="Опишите проблему или прикрепите фото..."
              placeholderTextColor={Colors.gray800}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
          </View>
        )}
        <View style={styles.photoContainer}>
          <View style={{ ...styles.sendButtonContainer, flex: 1, marginLeft: 0 }}>
            <Button
              styleBtn={styles.sendButton}
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
              <View style={styles.sendButtonTextWrapper}>
                <Text style={styles.sendButtonText}>Отправить запрос</Text>
                <ArrowsIcon height={24} width={56} />
              </View>
            </Button>
          </View>
        </View>
      </>
    );
  }
  if (roomType === 'request') {
    return (
      <>
        <View style={styles.inputFooterContainer}>
          <Input
            style={[styles.input, { marginBottom: 0 }]}
            value={inputText}
            onChangeText={setInputText}
            placeholder={placeholder[roomType]}
            multiline
          />
        </View>
        <View style={styles.photoContainer}>
          {selectedPhoto ? (
            <View style={styles.photoPreviewSmall}>
              <Image source={{ uri: selectedPhoto.uri }} style={styles.photoPreviewSmallImage} />
              <TouchableOpacity
                style={styles.removePhotoSmallButton}
                onPress={() => handle.handleRemovePhoto({ setSelectedPhoto })}
              >
                <MaterialIcons name="close" size={16} color={Colors.white} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.photoButtonSmall}
              onPress={() => handle.handlePhotoOptions({ setSelectedPhoto })}
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
      </>
    );
  }
}
