import {AuthAction, START_LOADING, STOP_LOADING} from "./ui.actions";
import {Action} from "@ngrx/store";

export interface State {
  isLoading: boolean;
};

const initialState: State = {
  isLoading: false
};


export function uiReducer(state = initialState, action: AuthAction) {
  switch (action.type) {
    case START_LOADING:
      return {isLoading: true}
    case STOP_LOADING :
      return {isLoading: false}
    default :
      return state
  }

}

export const getIsLoading = (state: State) => state.isLoading;
