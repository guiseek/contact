import {Route} from '@angular/router'
import {AuthContainer} from './containers'

export const authFeatureRoutes: Route[] = [
  {
    path: '',
    component: AuthContainer,
  },
]
