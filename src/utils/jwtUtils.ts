import decodeJwt from 'jwt-decode';

interface UserInfo {
    username: string,
    admin: boolean,
};

export const decodeToken = (accessToken: string): UserInfo => {
    
    return decodeJwt<UserInfo>(accessToken);
};
