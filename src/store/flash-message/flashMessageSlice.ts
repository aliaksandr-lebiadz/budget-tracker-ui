import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FLASH_MESSAGE_DURATION } from '../../properties/Properties';
import { SliceName } from '../../types/store';
import { FlashMessageAsyncActionType, FlashMessageDto } from './types';

export const addFlashMessage = createAsyncThunk(FlashMessageAsyncActionType.ADD, async(flashMessage: FlashMessageDto) => {
    await new Promise<void>((resolve) => {
        const delayMs = FLASH_MESSAGE_DURATION[flashMessage.type];
        setTimeout(() => {
            resolve();
        }, delayMs);
    });

    return flashMessage.id;
});

const executeDeleteFlashMessageById = (state: FlashMessageDto[], action: PayloadAction<string>) => {
   
    const index = state.findIndex(flashMessage => flashMessage.id === action.payload);
    state.splice(index, 1);
};

const flashMessagesSlice = createSlice({
    name: SliceName.FLASH_MESSAGES,
    initialState: [] as FlashMessageDto[],
    reducers: {
        deleteFlashMessageById: (state, action) => {
            executeDeleteFlashMessageById(state, action);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addFlashMessage.pending, (state, action) => {
            state.push(action.meta.arg);
        });
        builder.addCase(addFlashMessage.fulfilled, (state, action) => {
            executeDeleteFlashMessageById(state, action);
        });
    }
});

export const { deleteFlashMessageById } = flashMessagesSlice.actions;

export default flashMessagesSlice;
