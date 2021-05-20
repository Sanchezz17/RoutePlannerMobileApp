import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit';

import meetingsReducer from './meetings/reducer';
import requestsReducer from './requests/reducer';
import scheduleReducer from './schedule/reducer';
import usersReducer, { logout } from './users/reducer';

const appReducer = combineReducers({
    usersSlice: usersReducer,
    requestsSlice: requestsReducer,
    meetingsSlice: meetingsReducer,
    scheduleSlice: scheduleReducer,
});

type RootState = ReturnType<typeof appReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === logout.type) {
        state = {} as RootState;
    }
    return appReducer(state, action);
};

export default rootReducer;
