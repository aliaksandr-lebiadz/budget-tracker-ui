import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import nextId from 'react-id-generator';
import { addFlashMessage } from '../flash-message/flashMessageSlice';
import { logOut } from '../user/userSlice';
import { UNEXPECTED_ERROR } from '../../properties/Properties';
import { REFRESH_TOKEN_PATH } from '../../properties/api/ApiNavigation';
import { AsyncActionState } from '../../types/store';
import { FlashMessageType } from '../flash-message/types';

export const createCommonAsyncAction = <T, R>(type: string, api: (__: T) => Promise<AxiosResponse<R, any>>, successMessageFunction?: (data: R) => string) => {
    return createAsyncThunk<R, T>(type, async (payload: T, { dispatch }) => {
        try {
            const { data } = await api(payload);

            if (successMessageFunction) {
                dispatch(addFlashMessage({
                    id: nextId(),
                    type: FlashMessageType.SUCCESS,
                    message: successMessageFunction(data),
                }));
            }

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error?.response?.config.url?.endsWith(REFRESH_TOKEN_PATH)) {
                    dispatch(logOut());
                } else {
                    const errorMessage = error?.response?.data;
                    dispatch(addFlashMessage({
                        id: nextId(),
                        type: FlashMessageType.ERROR,
                        message: errorMessage,
                    }));

                    throw errorMessage;
                }
            }

            // eslint-disable-next-line
            throw UNEXPECTED_ERROR;
        }
    });
};

export const isSuccess = (type: string) => type.endsWith(AsyncActionState.FULFILLED);
