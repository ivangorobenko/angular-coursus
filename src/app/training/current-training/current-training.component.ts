import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {StopTrainingComponent} from "./stop-training/stop-training.component";
import {TrainingService} from "../training.service";
import {Store} from "@ngrx/store";
import * as fromTraining from "../training.reducer";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number | undefined;

  constructor(private dialog: MatDialog, private trainingService: TrainingService, private store: Store<fromTraining.State>) {
  }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store.select(fromTraining.getCurrentExercise).pipe(take(1)).subscribe(exercise => {
      const step = exercise?.duration as number / 100 * 1000;
      this.timer = setInterval(() => {
          this.progress = this.progress + 1;
          if (this.progress >= 100) {
            this.trainingService.completeExercice();
            if (this.timer) clearInterval(this.timer)
          }
        }, step
      ) as unknown as number

    })
  }

  onStop() {
    if (this.timer) clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.trainingService.cancelExercice(this.progress)
      else this.startOrResumeTimer();
    })
  }
}
