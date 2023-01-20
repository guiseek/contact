import {Component} from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  template: `<user-search-user (searchUser)="ref.close($event)"></user-search-user>`,
  styles: [
    `
      :host {
        display: block;
        padding: 12px;
      }
    `,
  ],
})
export class SearchUserDialog {
  constructor(readonly ref: MatDialogRef<SearchUserDialog>) {}
}
