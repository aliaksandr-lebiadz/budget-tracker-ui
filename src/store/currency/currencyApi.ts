import { callApi } from '../utils/apiUtils';
import { CURRENCY_PATH } from '../../properties/api/ApiNavigation';
import { NewCurrencyDto, CurrencyDto } from './types';
import { HttpMethod } from '../../types/api';

export const getCurrenciesApi = () => callApi<undefined, CurrencyDto[]>(CURRENCY_PATH);

export const addCurrencyApi = (currency: NewCurrencyDto) => callApi<NewCurrencyDto, number>(CURRENCY_PATH, currency, HttpMethod.POST);

export const changeCurrencyApi = (currency: CurrencyDto) => callApi<CurrencyDto, void>(CURRENCY_PATH, currency, HttpMethod.PUT);

export const deleteCurrencyByIdApi = (id: number) => callApi<number, void>(`${CURRENCY_PATH}/${id}`, null, HttpMethod.DELETE);
