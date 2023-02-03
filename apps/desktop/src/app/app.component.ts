import {Component, OnInit, inject} from '@angular/core'
import {AuthService} from '@contact/auth/data-access'
import {ClientFacade} from '@contact/client/data-access-meet'
import {RingService} from '@contact/client/shared/ui-meet'

export function createProcessor() {
  if (typeof Worker === 'undefined') {
    throw 'Web workers are not supported in this environment.'
  }
  // Create a new
  return new Worker(
    new URL('../workers/volume-meter.worker.ts', import.meta.url)
  )
}

@Component({
  selector: 'contact-root',
  // template: `<button (click)="onClick()">Ligar</button>`,
  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'desktop'

  auth = inject(AuthService)
  client = inject(ClientFacade)
  ring = inject(RingService)

  ngOnInit() {
    this.client.ring$.subscribe(({target, source}) => {
      console.log('source', source)

      const displayName = source === 1 ? 'Gui' : 'Demo'
      const ring$ = this.ring
        .ring({audio: '/assets/audio/modem-tones.mp3', displayName})
        .afterClosed()
      ring$.subscribe(console.log)
    })

    this.client.connect$.subscribe(() => {
      this.auth.validateUser().subscribe((user) => {
        this.client.register(user.id)
      })
    })
  }

  onClick() {
    this.auth.validateUser().subscribe((user) => {
      console.log(user)

      const data = {
        target: user.id === 1 ? 2 : 1,
        source: user.id,
      }

      this.client.call(data)
    })
  }
}
