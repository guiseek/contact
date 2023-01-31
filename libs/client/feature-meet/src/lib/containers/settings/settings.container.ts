import {Component} from '@angular/core'

interface TabItem {
  isActive: boolean
  label: string
  icon: string
  path: string[] | string
}

@Component({
  selector: 'meet-settings',
  templateUrl: './settings.container.html',
  styleUrls: ['./settings.container.scss'],
})
export class SettingsContainer {
  tabs: TabItem[] = [
    {
      isActive: false,
      label: 'Vídeo',
      icon: 'video_settings',
      path: ['/', 'meet', 'settings', 'video'],
    },
    {
      isActive: false,
      label: 'Alto-falante',
      icon: 'speaker',
      path: ['/', 'meet', 'settings', 'speaker'],
    },
    {
      isActive: false,
      label: 'Áudio',
      icon: 'settings_voice',
      path: ['/', 'meet', 'settings', 'audio'],
    },
  ]

  onClick(item: TabItem) {
    this.tabs.forEach((tab) => {
      if (tab.path === item.path) {
        tab.isActive = true
      } else {
        tab.isActive = false
      }
    })
  }
}
