import Constants from 'expo-constants';
import { COMMON_ERRORS } from '../shared/errors';

export const simplifyErrorMessage = (message) => {
	const error = COMMON_ERRORS.find((item) => item.error.toLowerCase().includes(message.toLowerCase()));
	if (error) return error.label;
	return message;
};

export const getAssetUrl = () => {
	let url = Constants?.expoConfig?.api?.url;
	if (Constants?.expoConfig?.api?.port) url += `:${Constants?.expoConfig?.api?.port}`;
	return url + Constants?.expoConfig?.api?.assets;
};