import * as fromUI from './shared/ui.reducer'
import * as fromAuth from './auth/auth.reducer'
import {ActionReducerMap, ActionType, createFeatureSelector, createSelector} from "@ngrx/store";

export interface State {
  ui: fromUI.State
  auth: fromAuth.State
}

export const reducers: ActionReducerMap<State,ActionType<State>> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer
};

export const getUiState = createFeatureSelector<fromUI.State>('ui');
export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading);
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);
