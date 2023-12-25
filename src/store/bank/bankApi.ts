import { callApi } from '../utils/apiUtils';
import { BANK_PATH } from '../../properties/api/ApiNavigation';
import { BankDto, NewBankDto } from './types';
import { HttpMethod } from '../../types/api';

export const getBanksApi = () => callApi<undefined, BankDto[]>(BANK_PATH);

export const addBankApi = (bank: NewBankDto) => callApi<NewBankDto, number>(BANK_PATH, bank, HttpMethod.POST);

export const changeBankApi = (bank: BankDto) => callApi<BankDto, void>(BANK_PATH, bank, HttpMethod.PUT);

export const deleteBankByIdApi = (id: number) => callApi<number, void>(`${BANK_PATH}/${id}`, null, HttpMethod.DELETE);
