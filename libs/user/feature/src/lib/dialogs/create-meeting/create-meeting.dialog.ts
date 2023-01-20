import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
  template: `<user-create-meeting
    (createMeeting)="ref.close($event)"
  ></user-create-meeting>`,
  styles: [
    `
      :host {
        display: block;
        padding: 12px;
      }
    `,
  ],
})
export class CreateMeetingDialog {
  constructor(readonly ref: MatDialogRef<CreateMeetingDialog>) {}
}
