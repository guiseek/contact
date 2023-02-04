import {Route} from '@angular/router'
import {UserFeatureShell} from './user-feature.shell'
import {AccountContainer, DeviceContainer, AgendaContainer} from './containers'
import {AuthGuard} from '@contact/client/data-access-auth'

export const userFeatureRoutes: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
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
