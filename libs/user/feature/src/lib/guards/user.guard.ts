import {Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router'
import {inject, Injectable} from '@angular/core'
import {AuthFacade} from '@contact/auth/data-access'
import {HttpErrorResponse} from '@contact/type'
import {EMPTY, catchError, map} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  authFacade = inject(AuthFacade)
  router = inject(Router)

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route)

    return this.authFacade.validate().pipe(
      catchError((err, caught) => {
        if (err) {
          this.redirectToAuth(err, state)
        }
        return caught
      }),
      map((response) => !!response)
    )
  }

  redirectToAuth(err: HttpErrorResponse, {url}: RouterStateSnapshot) {
    if (err.status === 401) {
      this.router.navigate(['/auth'], {queryParams: {redirectTo: url}})
    }
    throw new Error(err.message)
  }
}
