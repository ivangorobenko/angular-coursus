import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {Store} from "@ngrx/store";
import * as fromRoot from "../app.reducer";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad{

  constructor(private authService: AuthService, private router: Router, private store: Store<fromRoot.State>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean>{
    const isAuthenticated = this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
    if (isAuthenticated) return isAuthenticated;
    else this.router.navigate(['/login']);
    return false

  }

  canLoad(route: Route): boolean | UrlTree | Observable<boolean> {
    const isAuthenticated = this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
    if (isAuthenticated) return isAuthenticated;
    else this.router.navigate(['/login']);
    return false
  }

}
