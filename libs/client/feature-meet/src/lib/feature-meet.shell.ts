import {Component, inject} from '@angular/core'
import {AuthFacade} from '@contact/auth/data-access'

@Component({
  selector: 'meet-shell',
  template: `
    <contact-nav-drawer #drawer="contactNavDrawer">
      <contact-toolbar
        [showToggleMenu]="true"
        (menuToggled)="drawer.sidenav.toggle()"
      >
        <contact-toolbar-dropdown
          [user]="authFacade.user$"
          (menuClicked)="onMenuClicked($event)"
        ></contact-toolbar-dropdown>
      </contact-toolbar>
      <mat-list>
        <mat-list-item>
          <img matListItemAvatar src="/assets/photos/avatar.png" alt="Paris" />
          <p matListItemTitle>Guilherme Siquinelli</p>
          <p matListItemLine>
            <span>email@guiseek.dev</span>
          </p>
        </mat-list-item>
      </mat-list>

      <mat-divider></mat-divider>

      <main>
        <router-outlet></router-outlet>
      </main>
    </contact-nav-drawer>
  `,
  styles: [
    `
      :host {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      :host main {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class FeatureMeetShell {
  authFacade = inject(AuthFacade)

  activeLink = ''

  tabLinks = [
    {
      isActive: false,
      label: 'Alto-falante',
      icon: 'speaker',
      path: ['/', 'meet', 'speaker'],
    },
    {
      isActive: false,
      label: 'Vídeo',
      icon: 'video_settings',
      path: ['/', 'meet', 'video'],
    },
    {
      isActive: false,
      label: 'Áudio',
      icon: 'settings_voice',
      path: ['/', 'meet', 'audio'],
    },
  ]

  onMenuToggled<T>(value: T) {
    console.log(value)
  }

  onMenuClicked<T>(value: T) {
    console.log(value)
  }
}
