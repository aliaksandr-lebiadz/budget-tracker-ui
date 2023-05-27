import { createSlice } from '@reduxjs/toolkit';
import { createCommonAsyncAction } from '../utils/actionUtils';
import Message from '../../properties/Messages';
import { SliceName } from '../../types/store';
import { addCurrencyApi, changeCurrencyApi, deleteCurrencyByIdApi, getCurrenciesApi } from './currencyApi';
import { NewCurrencyDto, CurrencyAsyncActionType, CurrencyDto, CurrencyState } from './types';

export const getCurrencies = createCommonAsyncAction<undefined, CurrencyDto[]>(
    CurrencyAsyncActionType.GET,
    () => getCurrenciesApi(),
);

export const addCurrency = createCommonAsyncAction<NewCurrencyDto, number>(
    CurrencyAsyncActionType.ADD,
    (currency) => addCurrencyApi(currency),
    () => Message.CURRENCY_ADDED_SUCCESS,
);

export const changeCurrency = createCommonAsyncAction<CurrencyDto, void>(
    CurrencyAsyncActionType.CHANGE,
    (currency) => changeCurrencyApi(currency),
    () => Message.CURRENCY_CHANGED_SUCCESS,
);

export const deleteCurrencyById = createCommonAsyncAction<number, void>(
    CurrencyAsyncActionType.DELETE,
    (id) => deleteCurrencyByIdApi(id),
    () => Message.CURRENCY_DELETED_SUCCESS,
);

const initialState: CurrencyState = {
    data: [],
    loading: {
        get: false,
        add: false,
        change: false,
        delete: false,
    },
};

const currenciesSlice = createSlice({
    name: SliceName.CURRENCIES,
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCurrencies.pending, state => {
                state.loading.get = true;
            })
            .addCase(getCurrencies.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading.get = false;
            })
            .addCase(getCurrencies.rejected, state => {
                state.loading.get = false;
            })
            .addCase(addCurrency.pending, state => {
                state.loading.add = true;
            })
            .addCase(addCurrency.fulfilled, (state, action) => {
                state.data.push({
                    ...action.meta.arg,
                    id: action.payload
                });
                state.loading.add = false;
            })
            .addCase(addCurrency.rejected, state => {
                state.loading.add = false;
            })
            .addCase(changeCurrency.pending, state => {
                state.loading.change = true;
            })
            .addCase(changeCurrency.fulfilled, (state, action) => {
                const index = state.data.findIndex(currency => currency.id === action.meta.arg.id);
                state.data[index] = action.meta.arg;
                state.loading.change = false;
            })
            .addCase(changeCurrency.rejected, state => {
                state.loading.change = false;
            })
            .addCase(deleteCurrencyById.pending, state => {
                state.loading.delete = true;
            })
            .addCase(deleteCurrencyById.fulfilled, (state, action) => {
                const index = state.data.findIndex(currency => currency.id === action.meta.arg);
                state.data.splice(index, 1);
                state.loading.delete = false;
            })
            .addCase(deleteCurrencyById.rejected, state => {
                state.loading.delete = false;
            })
    },
});

export default currenciesSlice;
