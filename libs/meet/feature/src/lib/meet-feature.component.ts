import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'contact-meet-feature',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./meet-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetFeatureComponent {
}

declare global {
  interface HTMLMediaElement {
    setSinkId(deviceId: string): Promise<void>
  }
}
