import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit';
import usersReducer, { logout } from './users/reducer';

const appReducer = combineReducers({
    users: usersReducer,
});

type RootState = ReturnType<typeof appReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === logout.type) {
        state = {} as RootState;
    }
    return appReducer(state, action);
};

export default rootReducer;
