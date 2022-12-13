import decodeJwt from 'jwt-decode';

interface DecodedJwt {
    sub: string,
    admin: boolean,
};

interface UserInfo {
    username: string,
    admin: boolean,
};

export const decodeToken = (accessToken: string): UserInfo => {
    
    const decodedJwt = decodeJwt<DecodedJwt>(accessToken);
    return { username: decodedJwt.sub, admin: decodedJwt.admin };
};
