import {Route} from '@angular/router'
import {FeatureMeetShell} from './feature-meet.shell'
import {MeetGuard} from './guards/meet.guard'
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
    canActivate: [MeetGuard],
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
            path: '**',
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
