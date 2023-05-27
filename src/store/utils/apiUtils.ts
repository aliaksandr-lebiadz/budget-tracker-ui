import axios, { AxiosResponse } from 'axios';
import { refreshTokenApi } from '../user/userApi';
import { BEARER_TOKEN_PREFIX, LANGUAGE_HEADER } from '../../properties/api/ApiProperties';
import LocalStorageItem from '../../properties/LocalStorageItem';
import { HttpStatus, HttpMethod, HttpHeaders } from '../../types/api';

interface Config<T> {
    url: string,
    method: HttpMethod,
    data: T | null,
    headers: any,
};

export const callApi = <T, R>(path: string, payload: T | null = null, method: HttpMethod = HttpMethod.GET, authorized = true) => {

    let config: Config<T> = {
        url: `${process.env.REACT_APP_API_URL}${path}`,
        method,
        data: payload,
        headers: {
            [HttpHeaders.ACCEPT_LANGUAGE]: LANGUAGE_HEADER,
        },
    };

    if (authorized) {
        applyToken(config);
        return new Promise<AxiosResponse<R, any>>((resolve, reject) => {
            axios<R>(config)
                .then((response) => resolve(response))
                .catch((error) => {
                    if (isForbidden(error)) {
                        return refreshToken()
                            .then(() => {
                                applyToken(config);
                                axios<R>(config)
                                    .then((response) => resolve(response))
                                    .catch((error) => reject(error));
                            })
                            .catch((error) => reject(error));
                    }

                    return reject(error);
                });
        })
    }

    return axios<R>(config);
};

const applyToken = <T>(config: Config<T>) => {

    config.headers = {
        ...config.headers,
        [HttpHeaders.AUTHORIZATION]: `${BEARER_TOKEN_PREFIX} ${localStorage.getItem(LocalStorageItem.ACCESS_TOKEN)}`,
    };
};

const refreshToken = async (): Promise<void> => {

    return new Promise(async (resolve, reject) => {
        const refreshToken = localStorage.getItem(LocalStorageItem.REFRESH_TOKEN);
        if (!refreshToken) {
            reject();
        } else {
            try {
                const response = await refreshTokenApi({ value: refreshToken });
                localStorage.setItem(LocalStorageItem.ACCESS_TOKEN, response.data);
                resolve();
            } catch(error) {
                reject(error);
            }
        }
    });
};

const isForbidden = (error: any) => axios.isAxiosError(error) && error?.response?.status === HttpStatus.FORBIDDEN;
