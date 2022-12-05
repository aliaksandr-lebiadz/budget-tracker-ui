import { FlashMessageType } from '../store/flash-message/types';

export const FLASH_MESSAGE_DURATION = {
    [FlashMessageType.SUCCESS]: 3000,
    [FlashMessageType.INFO]: 3000,
    [FlashMessageType.ERROR]: 5000,
};

export const TOKENS_LIFETIME = 5 * 60 * 1000;
export const UNEXPECTED_ERROR = 'UnexpectedError';
