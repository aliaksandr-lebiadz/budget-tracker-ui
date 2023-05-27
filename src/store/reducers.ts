import { combineReducers } from 'redux';
import flashMessagesSlice from './flash-message/flashMessageSlice';
import userSlice from './user/userSlice';
import currenciesSlice from './currency/currencySlice';

export const rootReducer = combineReducers({
    user: userSlice.reducer,
    flashMessages: flashMessagesSlice.reducer,
    currencies: currenciesSlice.reducer,
});

export default rootReducer;
