import {Component} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'contact-audio-config',
  templateUrl: './audio-config.dialog.html',
  styleUrls: ['./audio-config.dialog.scss'],
})
export class AudioConfigDialog {
  form = new FormGroup({
    devices: new FormControl(),
  })

  constructor(readonly ref: MatDialogRef<AudioConfigDialog>) {}
}
