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
      <router-outlet></router-outlet>
    </main>
  `,
})
export class UserFeatureShell {
  protected auth = inject(AuthFacade)
  protected user = inject(UserFacade)

  onMenuClicked<T>(value: T) {
    console.log(value)
  }
}
