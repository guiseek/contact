import {Route} from '@angular/router'
import {MeetFeatureComponent} from './meet-feature.component'
import {AwaitContainer, RoomContainer} from './containers'
import {MeetGuard} from './guards/meet.guard'

export const meetFeatureRoutes: Route[] = [
  {
    path: ':meet',
    component: MeetFeatureComponent,
    canActivate: [MeetGuard],
    children: [
      {
        path: 'await',
        component: AwaitContainer,
      },
      {
        path: 'meet',
        component: RoomContainer,
      },
      {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'await',
      },
    ],
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
]
