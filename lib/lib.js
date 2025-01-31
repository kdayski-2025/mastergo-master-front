
import { COMMON_ERRORS } from '../helpers/enum';

export const simplifyErrorMessage = (message) => {
	const error = COMMON_ERRORS.find((item) => item.error.toLowerCase().includes(message.toLowerCase()));
	if (error) return error.label;
	return message;
};