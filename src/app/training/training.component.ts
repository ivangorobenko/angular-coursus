import {Component, OnInit} from '@angular/core';
import {TrainingService} from "./training.service";
import {Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromTraining from "./training.reducer";
import {getIsTraining} from "./training.reducer";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  onGoingTraining$: Observable<boolean> = of(false);

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) {
  }

  ngOnInit(): void {
    this.onGoingTraining$ = this.store.select(getIsTraining);
  }

}
