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

export const generateUUID = () => {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
}