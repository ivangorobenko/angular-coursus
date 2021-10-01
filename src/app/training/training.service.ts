import {Exercise} from "./exercise.model";
import {Injectable} from "@angular/core";
import {Subscription} from "rxjs";
import {addDoc, collection, collectionChanges, collectionData, Firestore} from "@angular/fire/firestore";
import {map, take} from "rxjs/operators";
import {UiService} from "../shared/ui.service";
import {Store} from "@ngrx/store";
import {StartLoading, StopLoading} from "../shared/ui.actions";
import * as fromTraining from '../training/training.reducer'
import {SetAvailableExercises, SetFinishedExercises, StartExercise, StopExercise} from "./training.actions";

@Injectable()
export class TrainingService {
  private runningExercice: Exercise | undefined;
  private fbSubs: Subscription[] = [];

  constructor(private firestore: Firestore, private uiService: UiService, private store: Store) {
  }

  fetchAvailableExercises() {
    this.store.dispatch(new StartLoading());
    const availableExercisesCollection = collection(this.firestore, 'availableExercises');
    return this.fbSubs.push(collectionChanges(availableExercisesCollection).pipe(map((exercisesFromDB: any) => {
      return exercisesFromDB.map((exerciceFromDB: any) => {
        return ({id: exerciceFromDB.doc.id, ...exerciceFromDB.doc.data()});
      })
    })).subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new SetAvailableExercises(exercises));
      this.store.dispatch(new StopLoading());
    }, () => {
      this.store.dispatch(new SetAvailableExercises(undefined));
      this.uiService.showSnackbar('Fetching exercises failed, please try again later', undefined, 3000);
      this.store.dispatch(new StopLoading());
    }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new StartExercise(selectedId));
  }

  completeExercice() {
    this.store.select(fromTraining.getCurrentExercise).pipe(take(1)).subscribe(ex => {
      this.addDataToDataBase({...ex, date: new Date(), state: 'completed'} as Exercise);
      this.store.dispatch(new StopExercise());
    })
  }

  cancelExercice(progress: number) {
    this.store.select(fromTraining.getCurrentExercise).pipe(take(1)).subscribe(ex => {
      const duration = this.runningExercice?.duration ?? 0;
      const calories = this.runningExercice?.calories ?? 0;
      this.addDataToDataBase({
        ...ex,
        duration: duration * (progress / 100),
        calories: calories * (progress / 100),
        date: new Date(), state: 'cancelled'
      } as Exercise)
      this.store.dispatch(new StopExercise());
    })
  }

  fetchCompletedOrCanceledExercises() {
    const finishedExercisesCollection = collection(this.firestore, 'finishedExercises');
    return this.fbSubs.push(collectionData(finishedExercisesCollection).subscribe((exercises: any) => {
      this.store.dispatch(new SetFinishedExercises(exercises))
    }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(fbSub => fbSub.unsubscribe())
  }

  private addDataToDataBase(exercise: Exercise) {
    const finishedExercisesCollection = collection(this.firestore, 'finishedExercises');
    addDoc(finishedExercisesCollection, exercise);
  }
}
