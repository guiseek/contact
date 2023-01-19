import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './share.dialog.html',
  styleUrls: ['./share.dialog.scss'],
})
export class ShareDialog {
  constructor(readonly ref: MatDialogRef<ShareDialog>) {}
}
