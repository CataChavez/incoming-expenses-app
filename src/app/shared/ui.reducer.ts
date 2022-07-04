import { Action, createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface State {
    isLoading: boolean;
};

export const initialState = {
    isLoading: false
};

const featureUiReducer = createReducer(
    initialState,
    on(isLoading, state => ({ ...state, isLoading: true })),
    on(stopLoading, state => ({ ...state, isLoading: false })),
);
export function uiReducer(state: State, action: Action) {
    return featureUiReducer(state, action);
}