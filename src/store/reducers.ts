import { combineReducers } from 'redux';
import flashMessagesSlice from './flash-message/flashMessageSlice';
import userSlice from './user/userSlice';

export const rootReducer = combineReducers({
    user: userSlice.reducer,
    flashMessages: flashMessagesSlice.reducer,
});

export default rootReducer;
