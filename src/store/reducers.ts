import { combineReducers } from 'redux';
import flashMessagesSlice from './flash-message/flashMessageSlice';
import userSlice from './user/userSlice';
import currenciesSlice from './currency/currencySlice';
import cardTypesSlice from './card-type/cardTypeSlice';

export const rootReducer = combineReducers({
    user: userSlice.reducer,
    flashMessages: flashMessagesSlice.reducer,
    currencies: currenciesSlice.reducer,
    cardTypes: cardTypesSlice.reducer,
});

export default rootReducer;
