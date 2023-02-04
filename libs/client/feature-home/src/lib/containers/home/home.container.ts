import {Component, OnInit, inject} from '@angular/core'
import {AuthFacade} from '@contact/client/data-access-auth'
import {ClientFacade} from '@contact/client/data-access-meet'
import {UserFacade} from '@contact/client/data-access-user'
import {of} from 'rxjs'

@Component({
  selector: 'home-home',
  templateUrl: './home.container.html',
  styleUrls: ['./home.container.scss'],
})
export class HomeContainer implements OnInit {
  authFacade = inject(AuthFacade)
  userFacade = inject(UserFacade)
  clientFacade = inject(ClientFacade)

  activeLink = ''

  links = [
    {
      route: ['/', 'user', 'agenda'],
      isActive: false,
      label: 'Agenda',
      icon: 'event',
    },
    {
      route: ['/', 'user', 'agenda'],
      isActive: false,
      label: 'Próxima',
      icon: 'schedule',
    },
    {
      route: ['/', 'meet', crypto.randomUUID().slice(-12)],
      isActive: true,
      label: 'Iniciar agora',
      icon: 'add_circle',
    },
  ]

  contacts = [
    {
      id: 1,
      name: 'Lucia',
      photoUrl: '/assets/photos/avatar.png',
    },
    {
      id: 2,
      name: 'Luciane',
      photoUrl: '/assets/photos/avatar.png',
    },
    {
      id: 3,
      name: 'Gustavo',
      photoUrl: '/assets/photos/avatar.png',
    },
  ]

  items = of([])

  ngOnInit() {
    this.authFacade.validate().subscribe(console.log)
    this.userFacade.users$.subscribe(console.log)
    this.userFacade.loadUsers()
  }

  callTo(source: number, target: number) {
    this.clientFacade.call({source, target})
  }

  onMenuToggled<T>(value: T) {
    console.log(value)
  }

  onMenuClicked<T>(value: T) {
    console.log(value)
  }
}
