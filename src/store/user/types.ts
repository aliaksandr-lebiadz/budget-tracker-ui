export enum UserAsyncActionType {
    LOGIN = 'user/login',
    LOGIN_AND_REMEMBER = 'user/loginAndRemember',
    SIGN_UP = 'user/signUp',
};

export interface UserCredentialsDto {
    username: string,
    password: string,
};

export interface UserTokensDto {
    accessToken: string,
    refreshToken: string,
};
