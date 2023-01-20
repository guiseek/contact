import {HttpService} from '@contact/type'
import {AuthService} from './domain/auth.service'
import {AuthServiceImpl} from './infrastructure/auth.service.impl'
import {AuthFacade} from './domain/auth.facade'
import {AuthFacadeImpl} from './applications/auth.facade.impl'
import {StorageService} from '@contact/shared/data-access'

export function authDataProviders() {
  return [
    {
      provide: AuthService,
      useFactory: (http: HttpService) => new AuthServiceImpl(http),
      deps: [HttpService],
    },
    {
      provide: AuthFacade,
      useFactory: (auth: AuthService, storage: StorageService) =>
        new AuthFacadeImpl(auth, storage),
      deps: [AuthService, StorageService],
    },
  ]
}
