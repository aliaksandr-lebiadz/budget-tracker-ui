import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { createCommonAsyncAction } from '../utils/actionUtils';
import { decodeToken } from '../../utils/jwtUtils';
import { TOKENS_LIFETIME } from '../../properties/Properties';
import { LocalStorageItem } from '../../properties';
import { ApiMessage } from '../../properties/api';
import { SliceName } from '../../types/store';
import { loginApi, signUpApi } from './userApi';
import { UserAsyncActionType, UserCredentialsDto, UserState, UserTokensDto } from './types';

export const login = createCommonAsyncAction<UserCredentialsDto, UserTokensDto>(
    UserAsyncActionType.LOGIN,
    (credentials) => loginApi(credentials),
    () => ApiMessage.LOGIN_SUCCESS,
);

export const loginAndRemember = createCommonAsyncAction<UserCredentialsDto, UserTokensDto>(
    UserAsyncActionType.LOGIN_AND_REMEMBER,
    (credentials) => loginApi(credentials),
    () => ApiMessage.LOGIN_SUCCESS,
);

export const signUp = createCommonAsyncAction<UserCredentialsDto, void>(
    UserAsyncActionType.SIGN_UP,
    (credentials) => signUpApi(credentials),
    () => ApiMessage.SIGN_UP_SUCCESS,
);

const userSlice = createSlice({
    name: SliceName.USER,
    initialState: { authenticated: false } as UserState,
    reducers: {
        loginFromStorage: () => {
            var userInfo = decodeToken(localStorage.getItem(LocalStorageItem.ACCESS_TOKEN)!!);
            return { authenticated: true, ...userInfo };
        },
        logOut: () => ({ authenticated: false }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (__, action) => {
                const { accessToken, refreshToken } = action.payload;
                localStorage.setItem(LocalStorageItem.ACCESS_TOKEN, accessToken);
                localStorage.setItem(LocalStorageItem.REFRESH_TOKEN, refreshToken);
                localStorage.setItem(LocalStorageItem.TOKENS_EXPIRE_AT, (Date.now() + TOKENS_LIFETIME).toString());

                const userInfo = decodeToken(accessToken);
                return { authenticated: true, ...userInfo };
            })
            .addCase(loginAndRemember.fulfilled, (__, action) => {
                const { accessToken, refreshToken } = action.payload;
                localStorage.setItem(LocalStorageItem.ACCESS_TOKEN, accessToken);
                localStorage.setItem(LocalStorageItem.REFRESH_TOKEN, refreshToken);

                const userInfo = decodeToken(accessToken);
                return { authenticated: true, ...userInfo };
            })
            .addMatcher(isAnyOf(login.rejected, loginAndRemember.rejected), () => ({ authenticated: false }));
    },
});

export const { loginFromStorage, logOut } = userSlice.actions;

export default userSlice;
