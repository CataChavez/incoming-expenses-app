import { Action, createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface uiState {
    isLoading: boolean;
};

export const initialState = {
    isLoading: false
};

const _uiReducer = createReducer(
    initialState,
    on(isLoading, state => ({ ...state, isLoading: true })),
    on(stopLoading, state => ({ ...state, isLoading: false })),
);
export function uiReducer(state: uiState | undefined, action: Action) {
    return _uiReducer(state, action);
}