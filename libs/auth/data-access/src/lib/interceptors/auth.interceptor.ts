import {HttpEvent, HttpHandler, HttpRequest, HttpInterceptor, HttpErrorResponse} from '@contact/type'
import {catchError, Observable} from 'rxjs'
import {StorageService} from '@contact/shared/data-access'

export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.storage.getItem('accessToken') ?? {}
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
    })
    return next.handle(authReq).pipe(
      catchError((err, caught) => {
        if (err) {
          this.resetAuth(err)
          throw err
        }

        return caught
      })
    )
  }

  resetAuth(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.storage.removeItem('accessToken')
    }
  }
}
