import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './styled';

// Мок-данные для карт
const mockCards = [
  {
    id: '1',
    last4: '1234',
    card_type: 'Visa',
    expiry_month: '12',
    expiry_year: '25',
    isDefault: true,
  },
  {
    id: '2',
    last4: '5678',
    card_type: 'MasterCard',
    expiry_month: '11',
    expiry_year: '24',
  },
];

// Мок-функция для подтверждения
const mockConfirmation = {
  url: 'https://example.com/confirmation',
};

export default function Payments({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cardHolderName: '',
  });
  const [cards, setCards] = useState([]);
  const [amout, setAmout] = useState(0);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Инициализация мок-данных
    setCards([{ id: '-1', isNew: true }, ...mockCards]);

    const defaultCard = mockCards.find((card) => card.isDefault);
    if (defaultCard) {
      setSelectedPaymentMethod(defaultCard.id);
    }
  }, []);

  const handleSetDefaultCard = async (cardId) => {
    setSelectedPaymentMethod(cardId);
    // Мок-логика для установки карты по умолчанию
    setCards((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        isDefault: card.id === cardId,
      }))
    );
  };

  const handleAddNewCard = async () => {
    const newCard = {
      id: String(Math.random()),
      last4: cardData.cardNumber.slice(-4),
      card_type: 'Visa',
      expiry_month: cardData.expiryDate.slice(0, 2),
      expiry_year: cardData.expiryDate.slice(3, 5),
    };
    setCards((prevCards) => [...prevCards, newCard]);
    setCardData({ cardNumber: '', expiryDate: '', cardHolderName: '' });
    setModalVisible(false);
  };

  const handlePayment = async () => {
    setIsLoading(true);
    // Мок-логика для обработки платежа
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Main');
    }, 2000);
  };

  const renderCard = ({ item }) => {
    if (item.isNew) {
      return (
        <TouchableOpacity
          style={styles.cardItem}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <View style={styles.cardInfo}>
            <Text style={styles.cardNumber}>••••</Text>
            <Text style={styles.cardHolder}>Привязать новую карту</Text>
          </View>
          {selectedPaymentMethod === '-1' && (
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          )}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.cardItem}
        onPress={() => handleSetDefaultCard(item.id)}
      >
        <View style={styles.cardInfo}>
          <Text style={styles.cardNumber}>•••• {item.last4}</Text>
          <Text style={styles.cardHolder}>{item.card_type}</Text>
          <Text style={styles.expiryDate}>
            Действует до {item.expiry_month}/{item.expiry_year}
          </Text>
        </View>
        {selectedPaymentMethod === item.id && (
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
        )}
      </TouchableOpacity>
    );
  };

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted;
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Вывод средств</Text>
      </View>
      <Text style={styles.title}>Доступно к выводу: </Text>
      <Input
        placeholder="Сумма"
        value={amout}
        style={styles.input}
        onChangeText={(text) => {
          setAmout(text);
        }}
      />
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        style={styles.cardsList}
      />
      <Button
        mt={11}
        mb={11}
        isLoading={isLoading}
        heightLoader={22}
        text={isLoading ? 'Обработка...' : 'Отправить'}
        onPress={handlePayment}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={styles.modalContent}
          >
            <Text style={styles.modalTitle}>Привязать новую карту</Text>

            <Input
              placeholder="Номер карты"
              value={cardData.cardNumber}
              onChangeText={(text) => {
                const numbersOnly = text.replace(/[^0-9\s]/g, '');
                const formatted = formatCardNumber(numbersOnly);
                if (formatted.length <= 19) {
                  setCardData({ ...cardData, cardNumber: formatted });
                }
              }}
              maxLength={19}
              style={styles.input}
            />

            <Input
              placeholder="ММ/ГГ"
              value={cardData.expiryDate}
              onChangeText={(text) => {
                const numbersOnly = text.replace(/[^0-9/]/g, '');
                const formatted = formatExpiryDate(numbersOnly);
                if (formatted.length <= 5) {
                  setCardData({ ...cardData, expiryDate: formatted });
                }
              }}
              maxLength={5}
              style={styles.input}
            />

            <Input
              placeholder="Имя держателя карты"
              value={cardData.cardHolderName}
              onChangeText={(text) => {
                const lettersOnly = text.replace(/[^A-Za-zА-Яа-я\s]/g, '');
                const upperCase = lettersOnly.toUpperCase();
                setCardData({ ...cardData, cardHolderName: upperCase });
              }}
              autoCapitalize="characters"
              style={styles.input}
            />

            <View style={styles.buttonContainer}>
              <Button
                text="Сохранить"
                onPress={handleAddNewCard}
                style={styles.submitButton}
              />
              <Button
                text="Отмена"
                onPress={() => {
                  setModalVisible(false);
                  setCardData({
                    cardNumber: '',
                    expiryDate: '',
                    cardHolderName: '',
                  });
                }}
                style={styles.cancelButton}
              />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
