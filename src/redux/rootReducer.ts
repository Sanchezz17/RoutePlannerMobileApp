import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from './users/reducer';

const rootReducer = combineReducers({
    users: usersReducer,
});

export default rootReducer;
