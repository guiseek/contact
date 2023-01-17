import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { SettingsService } from './settings/settings.service';

@Component({
  selector: 'contact-meet-feature',
  templateUrl: './meet-feature.component.html',
  styleUrls: ['./meet-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetFeatureComponent {
  private _mediaStream = new BehaviorSubject<MediaStream | null>(null);
  readonly mediaStream$ = this._mediaStream.asObservable();

  private _videoCapabilities =
    new BehaviorSubject<MediaTrackCapabilities | null>(null);
  readonly videoCapabilities$ = this._videoCapabilities.asObservable();
  private _videoRange = new BehaviorSubject<ULongRange>({});
  readonly videoRange$ = this._videoRange.asObservable();

  form = new FormGroup({
    audio: new FormGroup({
      devices: new FormControl(),
    }),
    video: new FormGroup({
      devices: new FormControl(),
      resolution: new FormControl(),
    }),
  });

  settings = inject(SettingsService);

  onVideoDevicesChange(value: MediaDeviceInfo[]) {
    console.log(value);

    this._videoRange.next({});
  }

  onVideoCapabilities(value: MediaTrackCapabilities) {
    this._videoCapabilities.next(value);
    if (value.height) {
      this._videoRange.next(value.height);
    }
  }

  openSettings() {
    this.settings.open();
    console.log();
  }
}

declare global {
  interface HTMLMediaElement {
    setSinkId(deviceId: string): Promise<void>;
  }
}
