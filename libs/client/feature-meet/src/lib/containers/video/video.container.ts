import {Component, OnDestroy} from '@angular/core'
import {FormControl} from '@angular/forms'
import {BehaviorSubject} from 'rxjs'

@Component({
  selector: 'meet-video',
  templateUrl: './video.container.html',
  styleUrls: ['./video.container.scss'],
})
export class VideoContainer implements OnDestroy {
  formControl = new FormControl()

  private _stream = new BehaviorSubject<MediaStream | null>(null)
  readonly stream$ = this._stream.asObservable()

  onDevicesChanges<T extends MediaDeviceInfo>(devices: T[] = []) {
    if (devices.length) {
      const stream = this._stream.getValue()

      if (stream instanceof MediaStream) {
        stream.getTracks().forEach((track) => track.stop())
      }

      const [{deviceId}] = devices
      navigator.mediaDevices
        .getUserMedia({video: {deviceId}})
        .then((stream) => this._stream.next(stream))
    } else {
      this._stream.next(null)
    }
  }

  ngOnDestroy() {
    if (this._stream.value) {
      this._stream.value.getTracks().forEach((track) => track.stop())
    }
  }
}
