import {Injectable} from '@angular/core'
import {MatDialog} from '@angular/material/dialog'
import {MeetDialog, RingDialog} from '../dialogs'
import {RingData} from '@contact/shared/types'

@Injectable()
export class CallService {
  constructor(private _dialog: MatDialog) {}

  private ring(data: RingData) {
    return this._dialog.open<RingDialog, RingData, boolean>(RingDialog, {
      data,
      disableClose: true,
      backdropClass: 'ring-backdrop',
      panelClass: 'ring-dialog',
      hasBackdrop: true,
    })
  }

  private meet(data: RingData) {
    return this._dialog.open<MeetDialog, RingData, boolean>(MeetDialog, {
      data,
      disableClose: true,
      backdropClass: 'meet-backdrop',
      panelClass: 'meet-dialog',
      restoreFocus: true,
      hasBackdrop: true,
    })
  }
}
