import { createSlice } from '@reduxjs/toolkit';
import { createCommonAsyncAction } from '../utils/actionUtils';
import Message from '../../properties/Messages';
import { SliceName } from '../../types/store';
import { addCardTypeApi, changeCardTypeApi, deleteCardTypeByIdApi, getCardTypesApi } from './cardTypeApi';
import { NewCardTypeDto, CardTypeAsyncActionType, CardTypeDto, CardTypeState } from './types';

export const getCardTypes = createCommonAsyncAction<undefined, CardTypeDto[]>(
    CardTypeAsyncActionType.GET,
    () => getCardTypesApi(),
);

export const addCardType = createCommonAsyncAction<NewCardTypeDto, number>(
    CardTypeAsyncActionType.ADD,
    (cardType) => addCardTypeApi(cardType),
    () => Message.CARD_TYPE_ADDED_SUCCESS,
);

export const changeCardType = createCommonAsyncAction<CardTypeDto, void>(
    CardTypeAsyncActionType.CHANGE,
    (cardType) => changeCardTypeApi(cardType),
    () => Message.CARD_TYPE_CHANGED_SUCCESS,
);

export const deleteCardTypeById = createCommonAsyncAction<number, void>(
    CardTypeAsyncActionType.DELETE,
    (id) => deleteCardTypeByIdApi(id),
    () => Message.CARD_TYPE_DELETED_SUCCESS,
);

const initialState: CardTypeState = {
    data: [],
    loading: {
        get: false,
        add: false,
        change: false,
        delete: false,
    },
};

const cardTypesSlice = createSlice({
    name: SliceName.CARD_TYPES,
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCardTypes.pending, state => {
                state.loading.get = true;
            })
            .addCase(getCardTypes.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading.get = false;
            })
            .addCase(getCardTypes.rejected, state => {
                state.loading.get = false;
            })
            .addCase(addCardType.pending, state => {
                state.loading.add = true;
            })
            .addCase(addCardType.fulfilled, (state, action) => {
                state.data.push({
                    ...action.meta.arg,
                    id: action.payload
                });
                state.loading.add = false;
            })
            .addCase(addCardType.rejected, state => {
                state.loading.add = false;
            })
            .addCase(changeCardType.pending, state => {
                state.loading.change = true;
            })
            .addCase(changeCardType.fulfilled, (state, action) => {
                const index = state.data.findIndex(cardType => cardType.id === action.meta.arg.id);
                state.data[index] = action.meta.arg;
                state.loading.change = false;
            })
            .addCase(changeCardType.rejected, state => {
                state.loading.change = false;
            })
            .addCase(deleteCardTypeById.pending, state => {
                state.loading.delete = true;
            })
            .addCase(deleteCardTypeById.fulfilled, (state, action) => {
                const index = state.data.findIndex(cardType => cardType.id === action.meta.arg);
                state.data.splice(index, 1);
                state.loading.delete = false;
            })
            .addCase(deleteCardTypeById.rejected, state => {
                state.loading.delete = false;
            })
    },
});

export default cardTypesSlice;
