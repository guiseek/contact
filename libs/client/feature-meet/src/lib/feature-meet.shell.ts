import {Component, OnInit, inject} from '@angular/core'
import {AuthFacade} from '@contact/auth/data-access'
import {NavigationService} from '@contact/client/shared/ui-layout'

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

      <mat-nav-list>
        <mat-divider></mat-divider>
        <a mat-list-item routerLink="/meet/settings">
          <mat-icon matListItemIcon>settings</mat-icon>
          <p matListItemTitle>Configurações</p>
        </a>
        <mat-divider></mat-divider>
      </mat-nav-list>

      <mat-divider></mat-divider>

      <nav contact-navigation></nav>

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
export class FeatureMeetShell implements OnInit {
  authFacade = inject(AuthFacade)
  navigationService = inject(NavigationService)

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

  ngOnInit(): void {
    this.navigationService.setItems([
      {
        type: 'heading',
        label: 'Contatos',
      },
      {
        icon: 'person_outline',
        type: 'link',
        label: 'Lucia',
        route: [],
      },
      {
        icon: 'person_outline',
        type: 'link',
        label: 'Luciane',
        route: [],
      },
      {
        icon: 'person_outline',
        type: 'link',
        label: 'Gustavo',
        route: [],
      },
    ])
  }

  onMenuToggled<T>(value: T) {
    console.log(value)
  }

  onMenuClicked<T>(value: T) {
    console.log(value)
  }
}
