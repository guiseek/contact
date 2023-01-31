import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core'
import {FormControl} from '@angular/forms'
import {BehaviorSubject} from 'rxjs'

@Component({
  selector: 'meet-speaker',
  templateUrl: './speaker.container.html',
  styleUrls: ['./speaker.container.scss'],
})
export class SpeakerContainer implements OnDestroy {
  @ViewChild('audioRef')
  readonly audioRef!: ElementRef<HTMLAudioElement>
  get audioEl() {
    return this.audioRef.nativeElement
  }

  formControl = new FormControl()

  private _stream = new BehaviorSubject<MediaStream | null>(null)
  readonly stream$ = this._stream.asObservable()

  private _progress = new BehaviorSubject(0)
  progress$ = this._progress.asObservable()

  onDevicesChanges<T extends MediaDeviceInfo>(devices: T[] = []) {
    if (devices.length) {
      const stream = this._stream.getValue()

      if (stream instanceof MediaStream) {
        stream.getTracks().forEach((track) => track.stop())
      }

      const [{deviceId}] = devices

      this.audioEl.setSinkId(deviceId)

      navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
        this._stream.next(stream)
        this.renderAnimation(stream)
      })
    } else {
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

  ngOnDestroy() {
    if (this._stream.value) {
      this._stream.value.getTracks().forEach((track) => track.stop())
    }
  }
}

declare global {
  interface HTMLMediaElement {
    setSinkId(deviceId: string): Promise<void>
  }
}
