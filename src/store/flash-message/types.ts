export enum FlashMessageAsyncActionType {
    ADD = 'flashMessages/add',
};

export enum FlashMessageType {
    SUCCESS = 'success',
    INFO = 'info',
    ERROR = 'error',
};

export interface FlashMessageDto {
    id: string,
    type: FlashMessageType,
    message: string,
};
