import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'meet-settings',
  templateUrl: './settings.container.html',
  styleUrls: ['./settings.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsContainer {
  tabs = [
    {
      label: 'Vídeo',
      icon: 'video_settings',
      path: '/meet/settings/video',
    },
    {
      label: 'Alto-falante',
      icon: 'speaker',
      path: '/meet/settings/speaker',
    },
    {
      label: 'Áudio',
      icon: 'settings_voice',
      path: '/meet/settings/audio',
    },
  ]
}
