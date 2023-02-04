import {Component, OnDestroy} from '@angular/core'
import {FormControl} from '@angular/forms'
import {BehaviorSubject} from 'rxjs'

@Component({
  selector: 'meet-video',
  templateUrl: './video.container.html',
  styleUrls: ['./video.container.scss'],
})
export class VideoContainer implements OnDestroy {
  private _loader = new BehaviorSubject(false)
  loader$ = this._loader.asObservable()

  formControl = new FormControl()

  private _stream = new BehaviorSubject<MediaStream | null>(null)
  readonly stream$ = this._stream.asObservable()

  async onDevicesChanges<T extends MediaDeviceInfo>(devices: T[] = []) {
    if (devices.length) {
      this._loader.next(true)
      this.cancelStream(this._stream.value)

      const deviceId = devices.at(0)?.deviceId
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {deviceId},
      })
      this._stream.next(stream)
      this._loader.next(false)
    } else {
      this.cancelStream(this._stream.value)
      this._stream.next(null)
    }
  }

  cancelStream(stream: MediaStream | null) {
    if (stream instanceof MediaStream) {
      stream.getTracks().forEach((track) => track.stop())
    }
  }

  ngOnDestroy() {
    this.cancelStream(this._stream.value)
  }
}
