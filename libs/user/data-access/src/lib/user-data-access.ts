import {HttpService} from '@contact/type'
import {UserFacade} from './domain/user.facade'
import {UserService} from './domain/user.service'
import {UserServiceImpl} from './infrastructure/user.service.impl'
import {UserFacadeImpl} from './applications/user.facade.impl'

export function userDataProviders() {
  return [
    {
      provide: UserService,
      useFactory: (http: HttpService) => new UserServiceImpl(http),
      deps: [HttpService],
    },
    {
      provide: UserFacade,
      useFactory: (user: UserService) => new UserFacadeImpl(user),
      deps: [UserService],
    },
    {
      provide: UserFacade,
      useFactory: (user: UserService) => new UserFacadeImpl(user),
      deps: [UserService],
    },
  ]
}
