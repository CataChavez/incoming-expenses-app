import { Action, createReducer, on, State } from '@ngrx/store';
import { IncomingExpenses } from '../models/incomingexpenses.model';
import { setItems, unSetItems } from './incoming-expenses.actions';

export interface incomingExpensesState {
    items: IncomingExpenses[],
};

export const initialState: incomingExpensesState = {
    items: [],
};

const _incomingExpensesReducer = createReducer(
    initialState,
    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(unSetItems, state => ({ ...state, items: [] })),
);
export function incomingExpenseReducer(state: incomingExpensesState | any, action: Action) {
    return _incomingExpensesReducer(state, action);
}