import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  Input,
} from '@angular/core';
import { AnimatinStreamBase } from '../base/animation-stream-base';
@Component({
  selector: 'contact-audio-input',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#999999"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path
        d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
      />
    </svg>
    <meter #meter min="0" max="200"></meter>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        column-gap: 14px;
      }
      :host meter::-webkit-meter-optimum-value {
        background: #19d019;
      }
    `,
  ],
})
export class AudioInputComponent
  extends AnimatinStreamBase
  implements AfterViewInit, OnDestroy
{
  @ViewChild('meter', { static: true })
  meterRef!: ElementRef<HTMLMeterElement>;

  @Input() active = true;

  private _constraints: MediaTrackConstraints = {
    deviceId: 'default',
  };
  get constraints() {
    return this._constraints;
  }
  @Input() set constraints(value) {
    this._constraints = value;
    this.ngAfterViewInit();
  }

  async ngAfterViewInit() {
    this.destroy();
    this.stream = await this.getStream();
    this.renderAnimation();
  }

  override renderAnimation(): void {
    if (this.stream) {
      const context = new AudioContext();
      const microphone = context.createMediaStreamSource(this.stream);
      const analyser = context.createAnalyser();
      const frequency = new Uint8Array(analyser.frequencyBinCount);

      microphone.connect(analyser);

      const frequencyLoop = () => {
        requestAnimationFrame(frequencyLoop);
        analyser.getByteFrequencyData(frequency);
        this.meterRef.nativeElement.value = frequency[0];
      };

      frequencyLoop();
      console.log(this.stream);
    }
  }

  ngOnDestroy() {
    this.destroy();
  }
}
