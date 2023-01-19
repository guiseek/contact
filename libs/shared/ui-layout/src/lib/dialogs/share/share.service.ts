import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialog } from './share.dialog';
import { ShareData } from './share-data';

@Injectable()
export class ShareService {
  constructor(private dialog: MatDialog) {}

  open<D extends ShareData>(data: D) {
    return this.dialog.open<ShareDialog, D, string>(ShareDialog, { data });
  }
}
