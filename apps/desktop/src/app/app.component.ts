import { Component, ElementRef, OnInit } from '@angular/core';

export function createProcessor() {
  if (typeof Worker === 'undefined') {
    throw 'Web workers are not supported in this environment.';
  }
  // Create a new
  return new Worker(
    new URL('../workers/volume-meter.worker.ts', import.meta.url)
  );
}

@Component({
  selector: 'contact-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'desktop';

  constructor(private _elRef: ElementRef<HTMLElement>) {}

  async ngOnInit() {
    console.log('');

    // const audioCtx = new AudioContext();
    // const canvasEl = document.createElement('canvas');
    // const canvas = canvasEl.transferControlToOffscreen();
    // this._elRef.nativeElement.appendChild(canvasEl)
    // // const canvas = new OffscreenCanvas(200, 10)

    // const worker = new Worker(
    //   new URL('../workers/volume-meter.worker.ts', import.meta.url)
    // );

    // worker.postMessage({ canvas }, [canvas]);

    // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // const audio = new Audio();
    // audio.srcObject = stream;
    // // audio.play()
    // const audioSource = audioCtx.createMediaElementSource(audio);
    // const analyser = audioCtx.createAnalyser();
    // audioSource.connect(analyser);
    // analyser.connect(audioCtx.destination);
    // analyser.fftSize = 128;
    // const bufferLength = analyser.frequencyBinCount;
    // const dataArray = new Uint8Array(bufferLength);

    // function animate() {
    //   analyser.getByteFrequencyData(dataArray);
    //   worker.postMessage({ bufferLength, dataArray }, {});
    //   requestAnimationFrame(animate);
    // }

    // animate();
  }
}
