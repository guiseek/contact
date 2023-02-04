import {Component, Input} from '@angular/core'

@Component({
  template: `
    <svg
      width="100%"
      viewBox="0 0 288 4"
      height="4"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect class="bg" />
      <rect class="bar" height="4px" [attr.width]="width" />
    </svg>
  `,
  selector: 'contact-progress-bar',
  styles: [
    `
      :host {
        width: 100%;
        display: block;
      }
      :host .bg {
        width: 100%;
        fill: #1976d2;
        fill-opacity: 0.12;
      }
      :host .bar {
        fill: #212121;
      }
      :host .bg,
      :host .bar {
        height: 4px;
        max-height: 4px;
      }
    `,
  ],
})
export class ProgressBarComponent {
  @Input() value?: number | null
  @Input() max?: number | null

  protected get width() {
    return ((this.value ?? 0) * 100) / (this.max ?? 100) + '%'
  }
}
