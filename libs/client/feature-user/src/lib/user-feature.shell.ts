import {Component, inject} from '@angular/core'
import {AuthFacade} from '@contact/client/data-access-auth'
import {UserFacade} from '@contact/client/data-access-user'

@Component({
  template: `
    <contact-toolbar>
      <a
        mat-icon-button
        class="toolbar-icon"
        matTooltip="Conta"
        routerLink="/user"
      >
        <mat-icon>account_circle</mat-icon>
      </a>
      <a
        mat-icon-button
        class="toolbar-icon"
        matTooltip="Dispositivos"
        routerLink="/user/devices"
      >
        <mat-icon>devices</mat-icon>
      </a>
      <a
        mat-icon-button
        class="toolbar-icon"
        matTooltip="Agenda"
        routerLink="/user/agenda"
      >
        <mat-icon>view_agenda</mat-icon>
      </a>

      <contact-toolbar-dropdown
        [user]="auth.user$"
        (menuClicked)="onMenuClicked($event)"
      ></contact-toolbar-dropdown>
    </contact-toolbar>

    <main>
      <section>
        <router-outlet></router-outlet>
      </section>

      <contact-nav-tabs [tabs]="tabs"></contact-nav-tabs>
    </main>
  `,
  styles: [
    `
      :host {
        flex: 1;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      :host main {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      :host section {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      :host nav,
      :host main {
        width: 100%;
      }
    `,
  ],
})
export class UserFeatureShell {
  protected auth = inject(AuthFacade)
  protected user = inject(UserFacade)

  tabs = [
    {
      label: 'Conta',
      icon: 'account_circle',
      path: '/user',
    },
    {
      label: 'Contatos',
      icon: 'contacts',
      path: '/user',
    },
    {
      label: 'Agenda',
      icon: 'today',
      path: '/user/agenda',
    },
  ]

  onMenuClicked<T>(value: T) {
    console.log(value)
  }
}
