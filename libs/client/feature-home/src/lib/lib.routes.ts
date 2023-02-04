import {Route} from '@angular/router'
import {HomeContainer} from './containers/home/home.container'
import {AuthGuard} from '@contact/client/data-access-auth'

export const featureHomeRoutes: Route[] = [
  {path: '', canActivate: [AuthGuard], component: HomeContainer},
]
