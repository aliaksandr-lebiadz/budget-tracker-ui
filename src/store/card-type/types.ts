import { HasId } from '../../types/common';
import { LoadingState } from '../../types/store';

export enum CardTypeAsyncActionType {
    GET = 'cardTypes/get',
    ADD = 'cardTypes/add',
    CHANGE = 'cardTypes/change',
    DELETE = 'cardTypes/delete',
};

export interface NewCardTypeDto {
    name: string,
    icon: string
};

export interface CardTypeDto extends NewCardTypeDto, HasId {
    
};

export interface CardTypeState {
    data: CardTypeDto[],
    loading: LoadingState,
};
