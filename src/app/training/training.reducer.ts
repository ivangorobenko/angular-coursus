import {Exercise} from "./exercise.model";
import * as fromRoot from '../app.reducer'
import {
  SET_AVAILABLE_EXERCISES,
  SET_FINISHED_EXERCISES,
  START_EXERCISE,
  STOP_EXERCISE,
  TrainingAction
} from "./training.actions";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  currentExercise: Exercise | undefined
};

export interface State extends fromRoot.State {
  training: TrainingState
};

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  currentExercise: undefined
}

export function trainingReducer(state = initialState, action: TrainingAction) {
  switch (action.type) {
    case SET_AVAILABLE_EXERCISES:
      console.log({
        ...state,
        availableExercises: action.payload
      })
      return {
        ...state,
        availableExercises: action.payload
      }
    case SET_FINISHED_EXERCISES:
      return {
        ...state,
        finishedExercises: action.payload
      }
    case START_EXERCISE:
      return {
        ...state,
        currentExercise: {...state.availableExercises.find(ex => ex.id === action.payload)}
      }
    case STOP_EXERCISE :
      return {
        ...state,
        currentExercise: undefined
      }
    default :
      return state
  }

}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getCurrentExercise = createSelector(getTrainingState, (state: TrainingState) => state.currentExercise);
export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.currentExercise !== undefined);
