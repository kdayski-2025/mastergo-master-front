import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import NeuralServiceInstance from '../../services/neural.service';

export const handlePhotoUpload = async (states) => {
	try {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.8,
		});

		if (!result.canceled) {
			states.setSelectedPhoto(result.assets[0]);
		}
	} catch (error) {
		console.log('Ошибка при загрузке фото:', error);
		Alert.alert('Ошибка', 'Не удалось загрузить фото');
	}
};

export const handleCameraCapture = async (states) => {
	try {
		// Запрашиваем разрешение на использование камеры
		const { status } = await ImagePicker.requestCameraPermissionsAsync();

		if (status !== 'granted') {
			Alert.alert('Ошибка', 'Для использования камеры требуется разрешение');
			return;
		}

		// Открываем камеру
		const result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.8,
		});

		if (!result.canceled) {
			states.setSelectedPhoto(result.assets[0]);
		}
	} catch (error) {
		console.log('Ошибка при использовании камеры:', error);
		Alert.alert('Ошибка', 'Не удалось сделать фото');
	}
};

export const handleRemovePhoto = (states) => {
	states.setSelectedPhoto(null);
};

export const handlePhotoOptions = (states) => {
	Alert.alert('Добавить фото', 'Выберите источник фото', [
		{
			text: 'Сделать снимок',
			onPress: () => handleCameraCapture(states),
		},
		{
			text: 'Выбрать из галереи',
			onPress: () => handlePhotoUpload(states),
		},
		{
			text: 'Отмена',
			style: 'cancel',
		},
	]);
};

export const handleSendMessage = async (states) => {
	console.log('states.selectedPhoto', states.selectedPhoto);
	console.log('states.selectedPhoto', states.inputText);
	if (!states.inputText.trim() || states.sending) return;
	try {
		states.setSending(true);
		console.log('states.selectedPhoto', states.selectedPhoto);
		console.log('states.selectedPhoto', states.inputText);
		const result = await NeuralServiceInstance.sendMessage(states.inputText, states.selectedPhoto);
		if (result.success) {
			states.setInputText('');
			states.setSelectedPhoto(null);
		} else {
			Alert.alert('Ошибка', result.error || 'Не удалось отправить сообщение');
		}
	} catch (error) {
		console.error('Ошибка отправки:', error);
		Alert.alert('Ошибка', error.message || 'Не удалось отправить сообщение');
	} finally {
		states.setSending(false);
	}
};

export const handleAddBalance = () => {
	Alert.alert('Здесь мог бы быть ваш функционал');
};

