import {Component} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'contact-video-config',
  templateUrl: './video-config.dialog.html',
  styleUrls: ['./video-config.dialog.scss'],
})
export class VideoConfigDialog {
  form = new FormGroup({
    devices: new FormControl(),
  })

  constructor(readonly ref: MatDialogRef<VideoConfigDialog>) {}
}
