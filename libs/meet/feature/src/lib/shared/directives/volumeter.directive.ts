import {Input, OnDestroy, Directive, ElementRef} from '@angular/core'
import {AnimatinStreamBase} from '../base/animation-stream-base'

@Directive({selector: 'canvas[contactVolumeter]'})
export class VolumeterDirective
  extends AnimatinStreamBase
  implements OnDestroy
{
  @Input() set contactVolumeter(constraints: MediaTrackConstraints) {
    this.constraints = constraints
    this.destroy()
    this.getStream().then((stream) => {
      this.stream = stream
      this.renderAnimation()
    })
  }

  @Input() background = '#ffffff'
  @Input() color = '#666666'
  @Input() opacity = 100

  @Input() active = true

  @Input() constraints: MediaTrackConstraints = {
    deviceId: 'default',
  }

  get canvas() {
    return this.elRef.nativeElement
  }

  constructor(readonly elRef: ElementRef<HTMLCanvasElement>) {
    super()
  }

  renderAnimation() {
    const audioCtx = new AudioContext()
    const canvasCtx = this.canvas.getContext('2d')

    if (this.stream && canvasCtx) {
      canvasCtx.fillStyle = this.hexToRgba(this.color, this.opacity)

      const microphoneNode = audioCtx.createMediaStreamSource(this.stream)
      const analyserNode = audioCtx.createAnalyser()
      const speakerNode = audioCtx.destination

      microphoneNode.connect(analyserNode)
      analyserNode.connect(speakerNode)

      const bufferLength = analyserNode.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      let bars: number
      let barX: number
      let barWidth: number
      let barHeight: number
      const {width, height} = this.canvas

      const render = () => {
        if (canvasCtx && this.stream) {
          canvasCtx.clearRect(0, 0, width, height)

          bars = width

          for (let i = 0; i < bars; i++) {
            barWidth = width / bars
            barX = i * (barWidth + 2)
            barHeight = -dataArray[i] / 1.6
            canvasCtx.fillRect(barX, height, barWidth, barHeight)
          }
        }
      }

      const renderLoop = () => {
        requestAnimationFrame(renderLoop)
        analyserNode.getByteFrequencyData(dataArray)
        render()
      }

      renderLoop()
    }
  }

  private hexToRgba(hex: string, alpha: number = 1) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    return `rgba(${r},${g},${b},${alpha})`
  }

  ngOnDestroy() {
    this.destroy()
  }
}
