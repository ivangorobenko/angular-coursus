import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Observable, Subscription} from "rxjs";
import {UiService} from "../../shared/ui.service";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../app.reducer";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: any;

  constructor(private authService: AuthService, private uiService: UiService, private store: Store<fromRoot.State>) {
  }

  isLoading$: Observable<boolean> | undefined;

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser(
      {
        email: form.value.email,
        password: form.value.password
      }
    )
  }

}
