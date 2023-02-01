import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router'
import {inject, Injectable} from '@angular/core'
import {AuthFacade} from '@contact/auth/data-access'
import {HttpErrorResponse} from '@contact/shared/types'
import {catchError, map} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  authFacade = inject(AuthFacade)
  router = inject(Router)

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authFacade.validate().pipe(
      map((response) => !!response),
      catchError((err, caught) => {
        if (err) {
          this.redirectToAuth(err, state)
        }
        return caught
      })
    )
  }

  redirectToAuth(err: HttpErrorResponse, {url}: RouterStateSnapshot) {
    if (err.status === 401) {
      this.router.navigate(['/auth'], {queryParams: {redirectTo: url}})
    }
    throw new Error(err.message)
  }
}
