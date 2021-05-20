import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit';

import clientsReducer from './clients/reducer';
import meetingsReducer from './meetings/reducer';
import requestsReducer from './requests/reducer';
import usersReducer, { logout } from './users/reducer';

const appReducer = combineReducers({
    usersSlice: usersReducer,
    requestsSlice: requestsReducer,
    meetingsSlice: meetingsReducer,
    clientsSlice: clientsReducer,
});

type RootState = ReturnType<typeof appReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === logout.type) {
        state = {} as RootState;
    }
    return appReducer(state, action);
};

export default rootReducer;
