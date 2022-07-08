import { ActionReducerMap} from "@ngrx/store";
import { uiState, uiReducer } from "./shared/ui.reducer";
import { authReducer, userState } from "./auth/auth.reducer";
import { incomingExpenseReducer, incomingExpensesState } from "./incoming-expenses/incoming-expenses.reducer";
export interface GlobalState{
    ui: uiState,
    user: userState,
    incomingExpenses: incomingExpensesState,
}

export const globalReducer: ActionReducerMap<GlobalState> = {
    ui: uiReducer,
    user: authReducer,
    incomingExpenses: incomingExpenseReducer,
}