import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit';
import usersReducer, { logout } from './users/reducer';
import requestsReducer from './requests/reducer';

const appReducer = combineReducers({
    usersSlice: usersReducer,
    requestsSlice: requestsReducer,
});

type RootState = ReturnType<typeof appReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === logout.type) {
        state = {} as RootState;
    }
    return appReducer(state, action);
};

export default rootReducer;
