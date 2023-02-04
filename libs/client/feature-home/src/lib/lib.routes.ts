import {Route} from '@angular/router'
import {HomeContainer} from './containers/home/home.container'
import {UserGuard} from './guards/user.guard'

export const featureHomeRoutes: Route[] = [
  {path: '', canActivate: [UserGuard], component: HomeContainer},
]
