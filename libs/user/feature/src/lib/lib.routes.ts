import {Route} from '@angular/router'
import {DeviceContainer} from './containers/device/device.container'
import {UserGuard} from './guards/user.guard'

export const userFeatureRoutes: Route[] = [
  {
    path: '',
    canActivate: [UserGuard],
    component: DeviceContainer,
  },
]
