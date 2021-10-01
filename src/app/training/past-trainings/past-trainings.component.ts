import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Exercise} from "../exercise.model";
import {TrainingService} from "../training.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromTraining from "../training.reducer";
import {getFinishedExercises} from "../training.reducer";

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ["date", "name", "duration", "calories", "state"];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort | null = null;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) {
  }

  ngOnInit(): void {
    this.store.select(getFinishedExercises).subscribe(finishedExercises => {
      this.dataSource.data = finishedExercises;
    })
    this.trainingService.fetchCompletedOrCanceledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }
}
