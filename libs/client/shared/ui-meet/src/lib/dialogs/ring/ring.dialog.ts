import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {RingData} from '@contact/shared/types'

@Component({
  selector: 'meet-ring',
  templateUrl: './ring.dialog.html',
  styleUrls: ['./ring.dialog.scss'],
})
export class RingDialog {
  private _audio: HTMLAudioElement

  private _repeat = true

  constructor(
    readonly ref: MatDialogRef<RingDialog>,
    @Inject(MAT_DIALOG_DATA) readonly data: RingData
  ) {
    this._audio = new Audio(data.audio)
    console.log(this._audio);

    this._audio.onended = () => {
      if (this._repeat) this._audio.play()
    }

    this._audio.play()
  }

  dany() {
    this._audio.pause()
    this._repeat = false
    this.ref.close(false)
  }

  accept() {
    this._audio.pause()
    this._repeat = false
    this.ref.close(true)
  }
}
