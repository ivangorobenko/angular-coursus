import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../app.reducer";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter();
  isAuth$: Observable<boolean> | undefined;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated)
  }

  onClose() {
    this.closeSidenav.emit()
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
}
