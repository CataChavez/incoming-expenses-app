import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.models";

export const setUser = createAction(
    '[Auth] setUser',
    props<{ user: User }>()
);

export const unSetUser = createAction('[Auth] UnSetUser');

