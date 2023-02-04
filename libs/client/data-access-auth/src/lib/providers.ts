import {HttpService, Router} from '@contact/shared/types'
import {AuthService} from './domain/auth.service'
import {AuthServiceImpl} from './infrastructure/auth.service.impl'
import {AuthFacade} from './domain/auth.facade'
import {AuthFacadeImpl} from './applications/auth.facade.impl'
import {StorageService} from '@contact/shared/data-access'
import {AuthGuard} from './guards/auth.guard'

const AUTH_SERVICE_PROVIDER = {
  provide: AuthService,
  useFactory: (http: HttpService) => new AuthServiceImpl(http),
  deps: [HttpService],
}

const AUTH_FACADE_PROVIDER = {
  provide: AuthFacade,
  useFactory: (auth: AuthService, storage: StorageService) =>
    new AuthFacadeImpl(auth, storage),
  deps: [AuthService, StorageService],
}

const AUTH_GUARD_PROVIDER = {
  provide: AuthGuard,
  useFactory: (authFacade: AuthFacade, router: Router) => {
    return new AuthGuard(authFacade, router)
  },
  deps: [AuthFacade, Router],
}

export const CLIENT_AUTH_PROVIDERS = [
  AUTH_SERVICE_PROVIDER,
  AUTH_FACADE_PROVIDER,
  AUTH_GUARD_PROVIDER,
]
