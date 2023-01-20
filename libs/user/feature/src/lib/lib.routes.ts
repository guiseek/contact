import {Route} from '@angular/router'
import {UserGuard} from './guards/user.guard'
import {UserFeatureShell} from './user-feature.shell'
import {AccountContainer, DeviceContainer, AgendaContainer} from './containers'

export const userFeatureRoutes: Route[] = [
  {
    path: '',
    canActivate: [UserGuard],
    component: UserFeatureShell,
    children: [
      {
        path: '',
        component: AccountContainer,
      },
      {
        path: 'devices',
        component: DeviceContainer,
      },
      {
        path: 'agenda',
        component: AgendaContainer,
      },
    ],
  },
]
