import {Route} from '@angular/router'
import {AudioContainer} from './containers/audio/audio.container'
import {VideoContainer} from './containers/video/video.container'
import {RoomContainer} from './containers/room/room.container'
import {FeatureMeetShell} from './feature-meet.shell'
import {SettingsContainer} from './containers/settings/settings.container'
import {SpeakerContainer} from './containers'

export const featureMeetRoutes: Route[] = [
  {
    path: '',
    component: FeatureMeetShell,
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
