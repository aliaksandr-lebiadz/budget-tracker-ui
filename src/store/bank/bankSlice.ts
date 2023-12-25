import { createSlice } from '@reduxjs/toolkit';
import { createCommonAsyncAction } from '../utils/actionUtils';
import { ApiMessage } from '../../properties/api';
import { SliceName } from '../../types/store';
import { addBankApi, changeBankApi, deleteBankByIdApi, getBanksApi } from './bankApi';
import { NewBankDto, BankAsyncActionType, BankDto, BankState } from './types';

export const getBanks = createCommonAsyncAction<undefined, BankDto[]>(
    BankAsyncActionType.GET,
    () => getBanksApi(),
);

export const addBank = createCommonAsyncAction<NewBankDto, number>(
    BankAsyncActionType.ADD,
    (bank) => addBankApi(bank),
    () => ApiMessage.BANK_ADDED_SUCCESS,
);

export const changeBank = createCommonAsyncAction<BankDto, void>(
    BankAsyncActionType.CHANGE,
    (bank) => changeBankApi(bank),
    () => ApiMessage.BANK_CHANGED_SUCCESS,
);

export const deleteBankById = createCommonAsyncAction<number, void>(
    BankAsyncActionType.DELETE,
    (id) => deleteBankByIdApi(id),
    () => ApiMessage.BANK_DELETED_SUCCESS,
);

const initialState: BankState = {
    data: [],
    loading: {
        get: false,
        add: false,
        change: false,
        delete: false,
    },
};

const banksSlice = createSlice({
    name: SliceName.BANKS,
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBanks.pending, state => {
                state.loading.get = true;
            })
            .addCase(getBanks.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading.get = false;
            })
            .addCase(getBanks.rejected, state => {
                state.loading.get = false;
            })
            .addCase(addBank.pending, state => {
                state.loading.add = true;
            })
            .addCase(addBank.fulfilled, (state, action) => {
                state.data.push({
                    ...action.meta.arg,
                    id: action.payload
                });
                state.loading.add = false;
            })
            .addCase(addBank.rejected, state => {
                state.loading.add = false;
            })
            .addCase(changeBank.pending, state => {
                state.loading.change = true;
            })
            .addCase(changeBank.fulfilled, (state, action) => {
                const index = state.data.findIndex(cardType => cardType.id === action.meta.arg.id);
                state.data[index] = action.meta.arg;
                state.loading.change = false;
            })
            .addCase(changeBank.rejected, state => {
                state.loading.change = false;
            })
            .addCase(deleteBankById.pending, state => {
                state.loading.delete = true;
            })
            .addCase(deleteBankById.fulfilled, (state, action) => {
                const index = state.data.findIndex(cardType => cardType.id === action.meta.arg);
                state.data.splice(index, 1);
                state.loading.delete = false;
            })
            .addCase(deleteBankById.rejected, state => {
                state.loading.delete = false;
            })
    },
});

export default banksSlice;
