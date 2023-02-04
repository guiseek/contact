import {
  Router,
  CanActivate,
  HttpErrorResponse,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@contact/shared/types'
import {AuthFacade} from '../domain/auth.facade'
import {catchError, map} from 'rxjs'

export class AuthGuard implements CanActivate {
  constructor(private authFacade: AuthFacade, private router: Router) {}

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
