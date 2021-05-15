import {
    AnyAction,
    combineReducers,
    createAction,
    Reducer,
} from '@reduxjs/toolkit';
import usersReducer from './users/reducer';

const appReducer = combineReducers({
    users: usersReducer,
});

type RootState = ReturnType<typeof appReducer>;

export const clearState = createAction('CLEAR_STATE');

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === clearState.type) {
        state = {} as RootState;
    }
    return appReducer(state, action);
};

export default rootReducer;
