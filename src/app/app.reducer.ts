import { ActionReducerMap} from "@ngrx/store";
import { uiState, uiReducer } from "./shared/ui.reducer";
import { authReducer, userState } from "./auth/auth.reducer";
export interface GlobalState{
    ui: uiState,
    user: userState,
}

export const globalReducer: ActionReducerMap<GlobalState> = {
    ui: uiReducer,
    user: authReducer,
}