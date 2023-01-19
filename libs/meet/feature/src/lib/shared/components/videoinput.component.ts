import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core'
import {Subject} from 'rxjs'

@Component({
  exportAs: 'contactVideoInput',
  selector: 'contact-video-input',
  template: ` <video autoplay playsInline poster="/assets/vectors/play-skew.svg" [srcObject]="stream" [muted]="stream?.active"></video>`,
  styles: [
    `
      :host {
        display: flex;
        max-width: 100%;
        width: inherit;
        flex: 1;
      }
      :host video {
        object-fit: contain;
        width: 100%;
        max-width: 100%;
        max-height: 100%;
      }
    `,
  ],
})
export class VideoInputComponent implements AfterViewInit, OnDestroy {
  stream?: MediaStream

  private _capabilities = new Subject<MediaTrackCapabilities>()
  readonly capabilities$ = this._capabilities.asObservable()

  @Output() capabilitiesChange = new EventEmitter<MediaTrackCapabilities>()

  @Input() active = true

  private _constraints: MediaTrackConstraints = {
    deviceId: 'default',
  }
  get constraints() {
    return this._constraints
  }
  @Input() set constraints(value) {
    this._constraints = value
    this.ngAfterViewInit()
  }

  async ngAfterViewInit() {
    this.stopStream()
    const video = this.constraints ? this.constraints : this.active
    this.stream = await navigator.mediaDevices.getUserMedia({video})
    const [videoTrack] = this.stream.getVideoTracks()
    this.capabilitiesChange.emit(videoTrack.getCapabilities())
  }

  private stopStream() {
    if (this.stream) {
      const tracks = this.stream.getTracks()
      tracks.forEach((track) => track.stop())
      this.stream = undefined
    }
  }

  ngOnDestroy() {
    this.stopStream()
  }
}
