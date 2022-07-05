import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../models/user.models';
import { setUser, unSetUser } from './auth.action';

export interface userState {
    user: User[] | any; 
};

export const initialState = {
    user: null,
    
};

const _authReducer = createReducer(
    initialState,
    on(setUser, (state, { user }) => ({ ...state, ...user })),
    on(unSetUser, state => ({ ...state, user: null })),
);
export function authReducer(state: userState | any, action: Action) {
    return _authReducer(state, action);
}