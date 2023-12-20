import { callApi } from '../utils/apiUtils';
import { CARD_TYPE_PATH } from '../../properties/api/ApiNavigation';
import { CardTypeDto, NewCardTypeDto } from './types';
import { HttpMethod } from '../../types/api';

export const getCardTypesApi = () => callApi<undefined, CardTypeDto[]>(CARD_TYPE_PATH);

export const addCardTypeApi = (cardType: NewCardTypeDto) => callApi<NewCardTypeDto, number>(CARD_TYPE_PATH, cardType, HttpMethod.POST);

export const changeCardTypeApi = (cardType: CardTypeDto) => callApi<CardTypeDto, void>(CARD_TYPE_PATH, cardType, HttpMethod.PUT);

export const deleteCardTypeByIdApi = (id: number) => callApi<number, void>(`${CARD_TYPE_PATH}/${id}`, null, HttpMethod.DELETE);
