import {Route} from '@angular/router'
import {AuthGuard} from '@contact/client/data-access-auth'
import {FeatureMeetShell} from './feature-meet.shell'
import {
  RoomContainer,
  AudioContainer,
  VideoContainer,
  SpeakerContainer,
  SettingsContainer,
} from './containers'

export const featureMeetRoutes: Route[] = [
  {
    path: '',
    component: FeatureMeetShell,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'settings',
        component: SettingsContainer,
        children: [
          {
            path: 'audio',
            component: AudioContainer,
          },
          {
            path: 'video',
            component: VideoContainer,
          },
          {
            path: 'speaker',
            component: SpeakerContainer,
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'audio',
          },
        ],
      },
      {
        path: ':room',
        component: RoomContainer,
      },
    ],
  },
]
