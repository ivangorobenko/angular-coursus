import {AuthData} from "./auth-data.model";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {TrainingService} from "../training/training.service";
import {UiService} from "../shared/ui.service";
import {Store} from "@ngrx/store";
import * as fromRoot from "../app.reducer";
import * as UI from "../shared/ui.actions";
import {SetAuthenticated, SetUnauthenticated} from "../auth/auth.actions";

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromRoot.State>
  ) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new SetAuthenticated())
        this.router.navigate(['/training'])
      } else {
        this.store.dispatch(new SetUnauthenticated())
        this.router.navigate(['/login']);
        this.trainingService.cancelSubscriptions();
      }
    })
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading())
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password).then(() => {
        this.store.dispatch(new UI.StopLoading())
      }
    ).catch(error => {
      this.store.dispatch(new UI.StopLoading())

      this.uiService.showSnackbar(error.message, undefined, 3000);
    })
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading())
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password).then(() => {
        this.store.dispatch(new UI.StopLoading())
      }
    ).catch(error => {
      this.store.dispatch(new UI.StopLoading())
      this.uiService.showSnackbar(error.message, undefined, 3000);
    })
  }

  logout() {
    this.afAuth.signOut().then(() => {
      }
    ).catch(e => {
      console.log(e)
    });
  }

}
