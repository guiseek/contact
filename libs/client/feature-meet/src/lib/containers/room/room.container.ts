import {Component, OnDestroy, OnInit, inject} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {AuthFacade} from '@contact/client/data-access-auth'
import {PeerFacade} from '@contact/client/data-access-meet'

@Component({
  selector: 'meet-room',
  templateUrl: './room.container.html',
  styleUrls: ['./room.container.scss'],
})
export class RoomContainer implements OnInit, OnDestroy {
  authFacade = inject(AuthFacade)
  peerFacade = inject(PeerFacade)

  route = inject(ActivatedRoute)

  ngOnInit() {
    if (this.route.snapshot.parent) {
      const {room} = this.route.snapshot.params
      this.authFacade.user$.subscribe((user) => {
        if (user) {
          navigator.mediaDevices
            .getUserMedia({audio: true, video: true})
            .then((stream) => {
              this.peerFacade.setStreams(stream)
            })

          this.peerFacade.hello({user: `${user.id}`, meet: room})
        }
      })
    }

    this.authFacade.validate().subscribe(console.log)
  }

  ngOnDestroy() {
    this.peerFacade.stopStream('local')
    this.peerFacade.stopStream('remote')
  }
}
