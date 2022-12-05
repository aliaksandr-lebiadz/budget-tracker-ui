import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { createCommonAsyncAction } from '../utils/actionUtils';
import { TOKENS_LIFETIME } from '../../properties/Properties';
import LocalStorageItem from '../../properties/LocalStorageItem';
import Message from '../../properties/Messages';
import { SliceName } from '../../types/store';
import { helloApi, loginApi, signUpApi } from './userApi';
import { UserAsyncActionType, UserCredentialsDto, UserTokensDto } from './types';

export const login = createCommonAsyncAction<UserCredentialsDto, UserTokensDto>(
    UserAsyncActionType.LOGIN,
    (credentials) => loginApi(credentials),
    Message.LOGIN_SUCCESS,
);

export const loginAndRemember = createCommonAsyncAction<UserCredentialsDto, UserTokensDto>(
    UserAsyncActionType.LOGIN_AND_REMEMBER,
    (credentials) => loginApi(credentials),
    Message.LOGIN_SUCCESS,
);

export const signUp = createCommonAsyncAction<UserCredentialsDto, void>(
    UserAsyncActionType.SIGN_UP,
    (credentials) => signUpApi(credentials),
    Message.SIGN_UP_SUCCESS,
);

export const hello = createCommonAsyncAction<undefined, string>(
    'hello',
    () => helloApi()
);

const userSlice = createSlice({
    name: SliceName.USER,
    initialState: {
        authenticated: false
    },
    reducers: {
        loginFromTokens: (state) => {
            state.authenticated = true;
        },
        logOut: (state) => {
            state.authenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem(LocalStorageItem.ACCESS_TOKEN, action.payload.accessToken);
                localStorage.setItem(LocalStorageItem.REFRESH_TOKEN, action.payload.refreshToken);
                localStorage.setItem(LocalStorageItem.TOKENS_EXPIRE_AT, (Date.now() + TOKENS_LIFETIME).toString());

                state.authenticated = true;
            })
            .addCase(loginAndRemember.fulfilled, (state, action) => {
                localStorage.setItem(LocalStorageItem.ACCESS_TOKEN, action.payload.accessToken);
                localStorage.setItem(LocalStorageItem.REFRESH_TOKEN, action.payload.refreshToken);

                state.authenticated = true;
            })
            .addMatcher(isAnyOf(login.rejected, loginAndRemember.rejected), (state) => {
                state.authenticated = false;
            });
    },
});

export const { loginFromTokens, logOut } = userSlice.actions;

export default userSlice;
