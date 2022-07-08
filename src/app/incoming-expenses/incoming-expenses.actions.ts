import { createAction, props } from "@ngrx/store";
import { IncomingExpenses } from "../models/incomingexpenses.model";

// setItems action
export const unSetItems = createAction('[IncomingExpenses] Unset items');

// setItems action
export const setItems = createAction(
    '[IncomingExpenses] Set items',
     props<{items: IncomingExpenses[]}>()
);

