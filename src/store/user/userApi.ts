import { callApi } from '../utils/apiUtils';
import { LOGIN_PATH, REFRESH_TOKEN_PATH, SIGN_UP_PATH } from '../../properties/api/ApiNavigation';
import { UserCredentialsDto, UserTokensDto } from './types';
import { HttpMethod } from '../../types/api';
import { StringWrapper } from '../../types/common';

export const loginApi = (credentials: UserCredentialsDto) => callApi<UserCredentialsDto, UserTokensDto>(LOGIN_PATH, credentials, HttpMethod.POST, false);

export const signUpApi = (credentials: UserCredentialsDto) => callApi<UserCredentialsDto, void>(SIGN_UP_PATH, credentials, HttpMethod.POST, false);

export const refreshTokenApi = (refreshToken: StringWrapper) => callApi<StringWrapper, string>(REFRESH_TOKEN_PATH, refreshToken, HttpMethod.POST, false);

