import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { checkTokensExpiration } from '../utils/authUtils';
import { loginFromStorage } from './user/userSlice';
import { Events } from '../types/common';

const initializeStore = () => {
    const store = configureStore({
        reducer: rootReducer,
    });

    checkTokensExpiration(store);

    window.addEventListener(Events.CLICK, () => {
        checkTokensExpiration(store);
    });
    
    window.addEventListener(Events.KEYPRESS, () => {
        checkTokensExpiration(store);
    });
    

    if (localStorage.accessToken && localStorage.refreshToken) {
        store.dispatch(loginFromStorage())
    }

    return store;
};

export default initializeStore;
