import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild, inject} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import {HttpService} from '@contact/type'

export function createProcessor() {
  if (typeof Worker === 'undefined') {
    throw 'Web workers are not supported in this environment.'
  }
  // Create a new
  return new Worker(
    new URL('../workers/volume-meter.worker.ts', import.meta.url)
  )
}

interface Ping {
  userId: number
  ping: number
}
interface Pong extends Ping {
  pong: number
}
interface PingPong extends Pong {
  latency: number
}

// this.http.post('/api/sse', value).subscribe()

const pong = (seconds: number, cb: (value: unknown) => void) => {
  const eventSource = new EventSource('/api/sse')
  eventSource.onmessage = ({data}) => {
    console.log(JSON.parse(data))
    const value = JSON.parse(data)
    cb({...value, pong: Date.now()})
  }
}

@Component({
  selector: 'contact-root',
  template: `
    <router-outlet></router-outlet>
    <ng-template #ringTmpl>
      <h1>Ring</h1>
      <button [mat-dialog-close]="false">
        Não
      </button>
      <button [mat-dialog-close]="true">
        Sim
      </button>
    </ng-template>
    <ng-template #callTmpl>
      <h1>Call</h1>
      <button [mat-dialog-close]="false">
        Desligar
      </button>
    </ng-template>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('ringTmpl')
  ringTmplRef!: TemplateRef<HTMLElement>

  @ViewChild('callTmpl')
  callTmplRef!: TemplateRef<HTMLElement>

  title = 'desktop'

  http = inject(HttpService)
  dialog = inject(MatDialog)

  map = new Map<number, PingPong>()

  async ngOnInit() {
    pong(1000, (value) => {
      this.http.post<PingPong>('/api/sse', value).subscribe((value) => {
        console.log(value);
        this.map.set(value.userId, value)
      })
    })

    setInterval(() => {
      const userId = 1
      const lastPong = this.map.get(userId)

      if (lastPong) {
        const diff = Date.now() - lastPong.pong
        console.log(diff);


        if (diff > 5000) {
          pong(1000, (value) => {
            this.http.post<PingPong>('/api/sse', value).subscribe((value) => {
              console.log(value);

              this.map.set(value.userId, value)
            })
          })
        }
      }
    }, 5000)
  }

  onRing() {
    const ring = this.dialog.open(this.ringTmplRef, {
      disableClose: true
    })
    ring.afterClosed().subscribe(accept => {
      if (accept) {
        this.dialog.open(this.callTmplRef, {
          disableClose: true
        })
      }
    })
  }

  ngAfterViewInit(): void {
    console.log(this.ringTmplRef);
    this.onRing()

  }
}
