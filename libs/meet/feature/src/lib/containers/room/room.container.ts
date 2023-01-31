import {PeerFacade, SignalingService} from '@contact/meet/data-access'
import {ChangeDetectorRef, Component, OnInit, inject} from '@angular/core'
import {AuthFacade} from '@contact/auth/data-access'
import {ActivatedRoute} from '@angular/router'
import {FormControl, FormGroup} from '@angular/forms'
import {MatDialog} from '@angular/material/dialog'
import {AudioConfigDialog} from '../../dialogs/audio-config/audio-config.dialog'
import {VideoConfigDialog} from '../../dialogs/video-config/video-config.dialog'

@Component({
  selector: 'contact-room',
  templateUrl: './room.container.html',
  styleUrls: ['./room.container.scss'],
})
export class RoomContainer implements OnInit {
  route = inject(ActivatedRoute)
  cdr = inject(ChangeDetectorRef)
  dialog = inject(MatDialog)

  authFacade = inject(AuthFacade)
  peerFacade = inject(PeerFacade)
  signaling = inject(SignalingService)

  form = new FormGroup({
    audio: new FormGroup({
      devices: new FormControl(),
    }),
    video: new FormGroup({
      devices: new FormControl(),
      resolution: new FormControl(),
    }),
  })

  ngOnInit() {
    // this.peerFacade.connection$.subscribe(console.log)

    if (this.route.snapshot.parent) {
      const {meet} = this.route.snapshot.parent.params
      this.authFacade.user$.subscribe((user) => {
        console.log(user)
        if (user) {
          navigator.mediaDevices
          .getUserMedia({audio: true, video: true})
          .then((stream) => {
            this.peerFacade.setStreams(stream)
          })
          this.peerFacade.hello({user: `${user.id}`, meet})
        }
      })
    }
  }

  openAudioConfig() {
    const dialog$ = this.dialog
      .open<
        AudioConfigDialog,
        MediaStreamConstraints,
        {devices: MediaDeviceInfo[]}
      >(AudioConfigDialog)
      .afterClosed()
  }

  openVideoConfig() {
    const dialog$ = this.dialog
      .open<
        VideoConfigDialog,
        MediaStreamConstraints,
        {devices: MediaDeviceInfo[]}
      >(VideoConfigDialog)
      .afterClosed()
    dialog$.subscribe(({devices} = {devices: []}) => {
      const device = devices.shift()
    })
  }
}
