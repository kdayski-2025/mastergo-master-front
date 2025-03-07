import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import RightArrow from '../../assets/icons/right-arrow.svg';
import styles from './styled';
import Input from '../Input/Input';
import Button from '../Button/Button';

export default function Feedback({ handleSendFeedback, requestId, isLoading }) {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = () => {
    handleSendFeedback({
      requestId: requestId,
      rating,
      comment: message,
    });
    setRating(0);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <></>
      ) : (
        <>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable key={star} onPress={() => handleRating(star)}>
                <FontAwesome
                  name="star"
                  size={30}
                  color={star <= rating ? '#FFD700' : '#D3D3D3'}
                  style={{ marginRight: 10 }}
                />
              </Pressable>
            ))}
          </View>

          <Input
            placeholder="Введите сообщение..."
            value={message}
            onChangeText={(text) => {
              if (text.length <= 200) {
                setMessage(text);
              }
            }}
            multiline
          />
        </>
      )}

      <Button
        mt={11}
        mb={11}
        isLoading={isLoading}
        text="Отправить"
        onPress={handleSubmit}
      />
    </View>
  );
}
