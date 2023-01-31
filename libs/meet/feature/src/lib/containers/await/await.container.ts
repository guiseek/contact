import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {SettingsService} from '../../settings/settings.service'
import {BehaviorSubject} from 'rxjs'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'contact-await',
  templateUrl: './await.container.html',
  styleUrls: ['./await.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AwaitContainer {
  readonly route = inject(ActivatedRoute)

  private _mediaStream = new BehaviorSubject<MediaStream | null>(null)
  readonly mediaStream$ = this._mediaStream.asObservable()

  private _videoCapabilities =
    new BehaviorSubject<MediaTrackCapabilities | null>(null)
  readonly videoCapabilities$ = this._videoCapabilities.asObservable()
  private _videoRange = new BehaviorSubject<ULongRange>({})
  readonly videoRange$ = this._videoRange.asObservable()

  form = new FormGroup({
    audio: new FormGroup({
      devices: new FormControl(),
    }),
    video: new FormGroup({
      devices: new FormControl(),
      resolution: new FormControl(),
    }),
  })

  settings = inject(SettingsService)

  onVideoDevicesChange(value: MediaDeviceInfo[]) {
    console.log(value)

    this._videoRange.next({})
  }

  onVideoCapabilities(value: MediaTrackCapabilities) {
    this._videoCapabilities.next(value)
    if (value.height) {
      this._videoRange.next(value.height)
    }
  }

  openSettings() {
    this.settings.open()
    console.log()
  }
}
