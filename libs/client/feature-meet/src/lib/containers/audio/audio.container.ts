import {Component, OnDestroy} from '@angular/core'
import {FormControl} from '@angular/forms'
import {BehaviorSubject} from 'rxjs'

@Component({
  selector: 'meet-audio',
  templateUrl: './audio.container.html',
  styleUrls: ['./audio.container.scss'],
})
export class AudioContainer implements OnDestroy {
  formControl = new FormControl()

  private _stream = new BehaviorSubject<MediaStream | null>(null)
  readonly stream$ = this._stream.asObservable()

  private _progress = new BehaviorSubject(0)
  progress$ = this._progress.asObservable()

  onDevicesChanges<T extends MediaDeviceInfo>(devices: T[] = []) {
    if (devices.length) {
      this.cancelStream(this._stream.value)

      const [{deviceId}] = devices
      navigator.mediaDevices
        .getUserMedia({audio: {deviceId}})
        .then((stream) => {
          this._stream.next(stream)
          this.renderAnimation(stream)
        })
    } else {
      this.cancelStream(this._stream.value)
      this._stream.next(null)
    }
  }

  renderAnimation(stream: MediaStream) {
    if (stream) {
      const context = new AudioContext()
      const microphone = context.createMediaStreamSource(stream)
      const analyser = context.createAnalyser()
      const frequency = new Uint8Array(analyser.frequencyBinCount)

      microphone.connect(analyser)

      const frequencyLoop = () => {
        requestAnimationFrame(frequencyLoop)
        analyser.getByteFrequencyData(frequency)
        this._progress.next(frequency[0])
      }

      frequencyLoop()
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
