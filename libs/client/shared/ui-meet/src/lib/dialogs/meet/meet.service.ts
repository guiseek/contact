import {Injectable} from '@angular/core'
import {MatDialog} from '@angular/material/dialog'
import {MeetDialog} from './meet.dialog'

@Injectable()
export class MeetService {
  constructor(private _dialog: MatDialog) {}

  open() {
    return this._dialog.open<MeetDialog>(MeetDialog)
  }
}
