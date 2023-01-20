import {Route} from '@angular/router'
import {MeetFeatureComponent} from './meet-feature.component'

export const meetFeatureRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: MeetFeatureComponent,
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
]
