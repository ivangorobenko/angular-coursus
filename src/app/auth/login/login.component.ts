import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {UiService} from "../../shared/ui.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../app.reducer";
import {map} from "rxjs/operators";
import {State} from "../../app.reducer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {validators: [Validators.required, Validators.min(6)]})
  });
  isLoading$: Observable<boolean> | undefined;

  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<State>
  ) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
  }
}
