import {HttpService} from '@contact/shared/types'
import {UserFacade} from './domain/user.facade'
import {UserService} from './domain/user.service'
import {UserServiceImpl} from './infrastructure/user.service.impl'
import {UserFacadeImpl} from './applications/user.facade.impl'

const USER_SERVICE_PROVIDER = {
  provide: UserService,
  useFactory: (http: HttpService) => new UserServiceImpl(http),
  deps: [HttpService],
}

const USER_FACADE_PROVIDER = {
  provide: UserFacade,
  useFactory: (user: UserService) => new UserFacadeImpl(user),
  deps: [UserService],
}

export const CLIENT_USER_PROVIDERS = [
  USER_SERVICE_PROVIDER,
  USER_FACADE_PROVIDER,
]
